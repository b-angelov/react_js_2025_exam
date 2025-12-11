import useAuth from "../hooks/useAuth.js";
import {Navigate, Outlet} from "react-router-dom";
import routes from "./routes.js"
import Spinner from "../components/common/Spinner.jsx";

export const ProtectedRoute = () => {
    const {context:auth} = useAuth();
    const token = auth?.token;

    if(!auth.attemptedLogin){
        return <Spinner message={"Зареждане..."}/>;
    }

    if (!token) {
        return <Navigate to={routes["login-page"]}/>;
    }

    return <Outlet/>;
};
