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

        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common["Authorization"];
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