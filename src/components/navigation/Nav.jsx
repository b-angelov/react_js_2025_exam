import useAPI from "../../hooks/useAPI.js";
import {useEffect, useState} from "react";
import {Link} from "react-router";
import NavItem from "./NavItem.jsx";
import useAuth from "../../hooks/useAuth.js";
import useReload from "../../hooks/useReload.js";

export default function Nav(){
    const {loadNavFiles} = useAPI()
    const [navData, setNavData] = useState([]);
    const {reload, setReload} = useState(false);
    const {setReloadPage} = useReload();
    const {context} = useAuth();
    const token = context.token;

    useEffect(() =>{
        setReloadPage("nav", ()=> setReload(!reload))
    },[])


    useEffect(() => {
        (async () =>{
            const menu_name = "main-menu";
            const language = "bg";
            try {
                const response = await loadNavFiles(menu_name, language);
                if (response.status === 200) {
                    // const data = await response.json();
                    setNavData(response.data);
                }
            } catch (error) {
                console.error("Error fetching navigation data:", error);
            }
        })();
    }, [context.apiLoaded]);


    const renderItems = () => {
        return navData.map((item, index) => (
            <NavItem key={index} item={item} />
        ));
    }
    return (
        <>
            <ul className={"nav"}>
                {renderItems()}
            </ul>
        </>
    )

}