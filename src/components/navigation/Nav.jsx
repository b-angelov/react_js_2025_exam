import useAPI from "../../hooks/useAPI.js";
import {useEffect, useState} from "react";
import {Link} from "react-router";
import NavItem from "./NavItem.jsx";

export default function Nav(){
    const {loadNavFiles} = useAPI()
    const [navData, setNavData] = useState([]);

    useEffect(() => {
        (async () =>{
            const menu_name = "main-menu";
            const language = "bg";
            try {
                const response = await loadNavFiles(menu_name, language);
                if (response.ok) {
                    const data = await response.json();
                    setNavData(data);
                }
            } catch (error) {
                console.error("Error fetching navigation data:", error);
            }
        })();
    }, []);


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