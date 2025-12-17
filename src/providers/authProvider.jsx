import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AuthContext from "../contexts/AuthContext.js";

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [apiJsLoaded, setApiJsLoaded] = useState({});
    const [user, setUser] = useState({});
    const [tryLogin, setTryLogin] = useState(false);
    const [attemptedLogin, setAttemptedLogin] = useState(false);



    const api = useMemo(() => {
        const api_instance = axios.create({
            baseURL: import.meta.env.VITE_API_ADDRESS,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            withCredentials: true,
        });

        api_instance.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log(error.response)
                if (error.response && error.response.status === 401 && error.response?.code === "token_not_valid") {
                    setToken(null);
                    setUser({});
                    setTryLogin(true)
                }
                return Promise.reject(error);
            }
        );

        return api_instance;
    }, []);

    useEffect(() => {

        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common["Authorization"];
        }

        setApiLoaded(prev => !prev);
    }, [token, api])

    const is_owner = (author_id) => {
        return user?.user_id && (user?.user_id === author_id);
    }

    const is_admin = () => {
        return !!user?.is_admin;
    }

    const is_superuser = () => {
        return !!user?.is_superuser;
    }

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            api,
            apiLoaded,
            is_authenticated: !!token,
            user,
            setUser,
            is_owner,
            is_admin,
            is_superuser,
            attemptedLogin,
            setAttemptedLogin,
            apiJsLoaded,
            setApiJsLoaded,
            tryLogin,
            setTryLogin,
        }),
        [token, user, api, apiLoaded,attemptedLogin,tryLogin]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;