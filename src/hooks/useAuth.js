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


        if(username && password){
            response = api.post(`/api/token/`,{username,password}).
            then(response=>{
                setToken(response.data.access);
                setUser(jwtDecode(response.data.access))
                toggleSuccess(response.status === 200, "Влизането e успешно!", "Влизането e неуспешно!", messageCallback)
                return {status: 200, data: response};
            }).catch((error) => {
                messageCallback("Влизането сe провали!")
                console.error("Error logging in:", error);
                return {status: 500, error}
            })
        } else{
            response = api.post(`/api/token/refresh/`).
            then(response=>{
                setToken(response.data.access);
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
        then(response=>toggleSuccess(response.status === 200, "Излизането е успешено!", "Излизането сe провали!", messageCallback)).
        catch((error) => {
            console.error("Error logging out:", error);
            messageCallback("Излизането сe провали!")
        });
        await setToken(null);
        await setUser({});
    }


    return {context, login, logout};
}