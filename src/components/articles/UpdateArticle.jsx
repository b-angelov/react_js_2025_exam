import {useParams} from "react-router";
import RenderArticleForm from "./RenderArticleForm.jsx";

export default function UpdateArticle() {
    const {id} =useParams()
    return (<>
        <h2>Редактиране на статия</h2>
        <RenderArticleForm method={"patch"} id={id}/>
    </>)
}