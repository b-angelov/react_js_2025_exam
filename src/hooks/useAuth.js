import {useContext} from "react";
import AuthContext from "../contexts/AuthContext.js";
import axios, {AxiosHeaders} from "axios";

export default function useAuth()  {
    const context = useContext(AuthContext);
    const {token, setToken, api} = context;

    const login = (username, password)=>{
        let response;
        if(!token){
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
                console.log("Response from API:", response)
                setToken(response.data.access);
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
                console.log("Response from API:", response)
                setToken(response.data.access);
                return {status: 200, data: response};
            }).catch((error) => {
                console.error("Error logging in:", error);
                return {status: 500, error}
            })
        }

        return response;
    }

    const logout = async () => {
        setToken(null);
    }

    return {context, login, logout};
}