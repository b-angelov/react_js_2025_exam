import AuthContext from "../../contexts/AuthContext.js";
import Articles from "./Articles.jsx";
import {useContext} from "react";

export default function MyArticles(){
    const {user} = useContext(AuthContext)
    const {user_id: id} = user
    return (<Articles author={id} title={"Картички, създадени от мен"} no_cards_title={"Няма картички"} no_cards_desc={"Все още нямам мои картички"}/>)
}