import useAPI from "../../hooks/useAPI.js";
import {useEffect, useState} from "react";
import {Link} from "react-router";
import NavItem from "./NavItem.jsx";
import useAuth from "../../hooks/useAuth.js";

export default function Nav(){
    const {loadNavFiles} = useAPI()
    const [navData, setNavData] = useState([]);
    const {context} = useAuth();
    const token = context.token;


    useEffect(() => {
        console.log("Token in Nav:", token);
        (async () =>{
            const menu_name = "main-menu";
            const language = "bg";
            try {
                const response = await loadNavFiles(menu_name, language);
                console.log(response)
                if (response.status === 200) {
                    // const data = await response.json();
                    console.log(response.data);
                    setNavData(response.data);
                }
            } catch (error) {
                console.error("Error fetching navigation data:", error);
            }
        })();
    }, [context.apiLoaded, token]);


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