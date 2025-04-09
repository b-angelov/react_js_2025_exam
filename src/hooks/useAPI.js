import {useEffect, useState} from "react";
import axios from "axios";
import useAuth from "./useAuth.js";

function useAPI(){

    const [apiMethods,setApiMethods] = useState({})
    const [apiLoaded, setApiLoaded] = useState(false)
    const {context} = useAuth()
    const api = context.api

    const apiAddress = import.meta.env.VITE_API_ADDRESS;

    async function loadApiFiles(){
        import(`${apiAddress}orth_calendar/apijs/?v=${Date.now()}`).
        then(response=>{
            setApiMethods(response)
            setApiLoaded(!apiLoaded)
        }).catch(err=>{
            console.log(err)
            throw new Error("Failed to fetch API methods")
        })
    }

    async function loadNavFiles(menu_name="main-menu", language="bg"){
        try{
            console.log(api)
            return await api.get(`${apiAddress}navigation/${menu_name}/api/?lang=${language}`)
        } catch{
            console.log("Failed to fetch navigation files")
        }
    }

    useEffect(()=>{
        loadApiFiles()
    },[])

    return {apiMethods, apiLoaded, loadNavFiles}

}

export default useAPI