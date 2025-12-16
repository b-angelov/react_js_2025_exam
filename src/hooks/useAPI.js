import {useContext, useEffect, useState} from "react";
// import axios from "axios";
import useAuth from "./useAuth.js";
import AuthContext from "../contexts/AuthContext.js";

function useAPI(){

    // const [apiMethods,setApiMethods] = useState({})
    const {apiJsLoaded:apiMethods, setApiJsLoaded:setApiMethods} = useContext(AuthContext)
    const {context} = useAuth()
    const {api, token, setUser} = context

    const apiAddress = import.meta.env.VITE_API_ADDRESS;

    async function loadApiFiles(){
        if (Object.keys(apiMethods).length) return;
        import(`${apiAddress}orth_calendar/apijs/?v=${Date.now()}` /* @vite-ignore */).
        then(response=>{
            setApiMethods(response)
            // setApiLoaded(true)
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

    async function loadArticles(date, feast, saint, holiday, author, id, favorites){
        try{
            return await api.get(`${apiAddress}api/articles/?id=${id||""}&date=${date||""}&feast=${feast||""}&saint=${saint||""}&holiday=${holiday||""}&author=${author||""}&favorites=${favorites||""}`)
        } catch(err){
            console.log(err)
            throw new Error("Failed to fetch articles")
        }
    }

    const getProfile = async (token=null,id="my") => {
        if (!token && !context?.token){ return; }
        try {
            let headers = {};
            if(token){headers = {Authorization: `Bearer ${token}`}};
            const response = await api.get(`/api/profile/${id}/`, headers);
            return response.data
        } catch (error) {
            console.error("Error fetching profile:", error);
            return null;
        }
    }

    const like = async (id,likedFn,likesCountFn) =>{
        api.post(`api/articles/${id}/like/`).then(response=>{
            likedFn((prev)=>!prev);
            likesCountFn(response.data.likes_count);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => {
        if(!token) return;
        getProfile().then(profileData=>{
            setUser((prev) => ({
                ...prev, ...profileData
            }))})
    }, [token]);

    useEffect(()=>{
        if (!Object.keys(apiMethods).length){
            loadApiFiles()
        }
    },[apiMethods])

    return {apiMethods, apiLoaded: !!Object.keys(apiMethods).length, loadNavFiles, loadApiFiles, loadArticles, getProfile, like}

}

export default useAPI