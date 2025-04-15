import useAuth from "../../hooks/useAuth.js";
import {Navigate} from "react-router-dom";
import routes from "../../routes/routes.js";
import useApi from "../../hooks/useAPI.js";
import useReload from "../../hooks/useReload.js";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import MainContext from "../../contexts/MainContext.js";

export default function Logout() {

    const {logout} = useAuth()
    const {setMessage} = useContext(MainContext)
    const {loadNavFiles} = useApi()
    const {reloadPage} = useReload()
    const navigate = useNavigate()
    const {apiLoaded} = useApi()

    useEffect(()=> {
        (async () => {
            await logout(setMessage)
        })();
    },[])

    return (<></>)
}