import {useEffect, useState} from "react";

function useAPI(){

    const [apiMethods,setApiMethods] = useState({})
    const [apiLoaded, setApiLoaded] = useState(false)

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
            return await fetch(`${apiAddress}navigation/${menu_name}/api/?lang=${language}`)
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