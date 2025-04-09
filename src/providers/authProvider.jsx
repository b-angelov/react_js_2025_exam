import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AuthContext from "../contexts/AuthContext.js";

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [apiLoaded, setApiLoaded] = useState(false);


    const api = useMemo(() => {
        return axios.create({
            baseURL: import.meta.env.VITE_API_ADDRESS,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            withCredentials: true,
        });
    }, []);

    useEffect(() => {
        console.log("Token changed:", token);

        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            console.log("Authorization header set:", api.defaults.headers.common["Authorization"]);
        } else {
            delete api.defaults.headers.common["Authorization"];
            console.log("Authorization header removed");
        }

        setApiLoaded(prev => !prev);
    }, [token, api]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            api,
            apiLoaded
        }),
        [token, api, apiLoaded]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;