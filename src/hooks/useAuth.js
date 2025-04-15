import {useContext, useEffect} from "react";
import AuthContext from "../contexts/AuthContext.js";
import axios, {AxiosHeaders} from "axios";
import {jwtDecode} from "jwt-decode";
import MainContext from "../contexts/MainContext.js";

export default function useAuth()  {
    const context = useContext(AuthContext);
    const {token, setToken, api, setUser, user} = context;

    const toggleSuccess = (success,onSuccess="",onFail="",fn=()=>{}) => {
        success ? fn(onSuccess) : fn(onFail);
    }

    const login = (username, password, messageCallback=()=>{})=>{
        let response;

        console.log(token)

        if(username && password){
            // fetch(`${import.meta.env.VITE_API_URL}/api/token/`, {})
            // response = fetch(`${import.meta.env.VITE_API_ADDRESS}api/token/`,{
            //     method: 'POST',
            //     headers:{
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     },
            //     credentials: 'include',
            //     body: JSON.stringify({
            //         username: username,
            //         password: password
            //     })
            // })
            //     .then(response => response.json())
            //     .then((response) => {
            //     setToken(response.access);
            //     return {status: 200, data: response};
            // }).catch((error) => {
            //     console.error("Error logging in:", error);
            //     return {status: 500, error}
            // });
            response = api.post(`/api/token/`,{username,password}).
            then(response=>{
                setToken(response.data.access);
                console.log(jwtDecode(response.data.access))
                setUser(jwtDecode(response.data.access))
                toggleSuccess(response.status === 200, "Влизането e успешно!", "Влизането e неуспешно!", messageCallback)
                return {status: 200, data: response};
            }).catch((error) => {
                messageCallback("Влизането сe провали!")
                console.error("Error logging in:", error);
                return {status: 500, error}
            })
        } else{
            // response = fetch(`${import.meta.env.VITE_API_ADDRESS}api/token/refresh/`,{
            //     method: 'POST',
            //     headers:{
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',
            //     },
            //     credentials: 'include',
            //     body: JSON.stringify({
            //         username: username,
            //         password: password
            //     })
            // })
            //     .then(response => response.json())
            //     .then((response) => {
            //     setToken(response.access);
            //     return {status: 200, data: response};
            // }).catch((error) => {
            //     console.error("Error logging in:", error);
            //     return {status: 500, error}
            // })
            response = api.post(`/api/token/refresh/`).
            then(response=>{
                setToken(response.data.access);
                console.log(jwtDecode(response.data.access))
                setUser(jwtDecode(response.data.access))
                return {status: 200, data: response};
            }).catch((error) => {
                console.error("Error logging in:", error);
                return {status: 500, error}
            })
        }

        return response;
    }

    const logout = async (messageCallback=()=>{}) => {
        await api.post(`/api/token/logout/`, {}).
        then(response=>toggleSuccess(response.status === 200, "Излязохте успешено!", "Излизането сe провали!", messageCallback)).
        catch((error) => {
            console.error("Error logging out:", error);
            messageCallback("Излизането сe провали!")
        });
        await setToken(null);
        await setUser({});
    }


    return {context, login, logout};
}