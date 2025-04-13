import {useContext, useEffect} from "react";
import AuthContext from "../contexts/AuthContext.js";
import axios, {AxiosHeaders} from "axios";
import {jwtDecode} from "jwt-decode";

export default function useAuth()  {
    const context = useContext(AuthContext);
    const {token, setToken, api, setUser, user} = context;

    const login = (username, password)=>{
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
                return {status: 200, data: response};
            }).catch((error) => {
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

    const logout = async () => {
        await api.post(`/api/token/logout/`, {});
        await setToken(null);
        await setUser({});
    }


    return {context, login, logout};
}