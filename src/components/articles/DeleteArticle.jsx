import {useParams} from "react-router";
import RenderArticleForm from "./RenderArticleForm.jsx";

export default function DeleteArticle() {
    const {id} =useParams()
    return (<>
        <h1>Изтриване на статия</h1>
        <RenderArticleForm method={"delete"} id={id}/>
    </>)
}