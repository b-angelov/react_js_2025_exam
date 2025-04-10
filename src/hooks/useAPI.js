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
            setApiLoaded(true)
        }).catch(err=>{
            console.log(err)
            throw new Error("Failed to fetch API methods")
        })
    }

    async function loadNavFiles(menu_name="main-menu", language="bg"){
        try{
            return await api.get(`${apiAddress}navigation/${menu_name}/api/?lang=${language}`)
        } catch{
            console.log("Failed to fetch navigation files")
        }
    }

    async function loadArticles(date, feast, saint, holiday, author){
        try{
            return await api.get(`${apiAddress}api/articles/?date=${date||""}&feast=${feast||""}&saint=${saint||""}&holiday=${holiday||""}&author=${author||""}`)
        } catch(err){
            console.log(err)
            throw new Error("Failed to fetch articles")
        }
    }

    return {apiMethods, apiLoaded, loadNavFiles, loadApiFiles, loadArticles}

}

export default useAPI