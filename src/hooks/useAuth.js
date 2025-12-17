import {useContext, useEffect} from "react";
import AuthContext from "../contexts/AuthContext.js";
// import axios, {AxiosHeaders} from "axios";
import {jwtDecode} from "jwt-decode";
import MainContext from "../contexts/MainContext.js";
// import useAPI from "./useAPI.js";

export default function useAuth()  {
    const context = useContext(AuthContext);
    const {token, setToken, api, setUser, user, setAttemptedLogin, tryLogin, setTryLogin} = context;

    const toggleSuccess = (success,onSuccess="",onFail="",fn=()=>{}) => {
        success ? fn(onSuccess) : fn(onFail);
    }

    const login = (username, password, messageCallback=()=>{})=>{
        let response;


        if(username && password){
            response = api.post(`/api/token/`,{username,password}).
            then(response=>{
                (async () => {
                    await setToken(response.data.access);
                    const data = jwtDecode(response.data.access)
                    setUser((prev) => ({...prev, ...data}))
                    return {status: 200, data: response};
                })();
                toggleSuccess(response.status === 200, "Влизането e успешно!", "Влизането e неуспешно!", messageCallback)
                return {status: 200, data: response};
            }).catch((error) => {
                messageCallback("Влизането сe провали!")
                console.error("Error logging in:", error);
                return {status: 500, error}
            }).finally(()=>setAttemptedLogin(true))
        } else{
            response = api.post(`/api/token/refresh/`).
            then(response=>{
                const claims = jwtDecode(response.data.access);
                (async ()=> {
                    await setToken(response.data.access);
                    setUser((prev)=>({...prev, ...claims}))
                    return {status: 200, data: response};
                })();
                return {status: 200, data: response};
            })
                .catch((error) => {
                console.error("Error logging in:", error);
                return {status: 500, error}
            }).finally(()=>setAttemptedLogin(true))
        }

        return response;
    }

    const logout = async (messageCallback=()=>{}) => {
        if(!token || !user) return;
        await api.post(`/api/token/logout/`, {}).
        then(response=> {
            toggleSuccess(response.status === 200, "Излизането е успешено!", "Излизането сe провали!", messageCallback);
            (async () => {
                await setToken(null);
                await setUser({});
            })();
        }).
        catch((error) => {
            if (error.response.data.error.toLowerCase().includes('blacklist')) {
                    setToken(null)
                    setUser({});
                    messageCallback("Вече сте излезли");
            }
            console.error("Error logging out:", error);
            messageCallback("Излизането сe провали!")
        });
    }

    const register = async  (username, password1, password2, messageCallback=()=>{}) => {
        return api.post(`/api/register/`, {username, password1, password2}).
        then(response=>{
            toggleSuccess(response.status === 201, "Регистрацията е успешена!", "Регистрацията сe провали!", messageCallback)
            setToken(response.data.access);
            const data = jwtDecode(response.data.access)
            setUser((prev) => ({...prev, ...data}))
            return {status: 201, data: response};
        }).
        catch((error) => {
            messageCallback("Регистрацията сe провали!")
            console.error("Error registering:", error);
            return {status: 500, error}
        }).finally(()=>{setAttemptedLogin(true)});
    }

    useEffect(()=>{
        if(tryLogin){
            (async ()=> {
                await login();
            })()
            setTryLogin(false)
        }
    }, [tryLogin])


    return {context, login, logout, register};
}