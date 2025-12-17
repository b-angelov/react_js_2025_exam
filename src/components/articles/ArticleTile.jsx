import routes from "../../routes/routes.js";
import {Link} from "react-router";
import saintImage from "../../assets/images/articles/saint.webp";
import {LikeStar} from "../common/LikeStar.jsx";
import {useContext, useState} from "react";
import AuthContext from "../../contexts/AuthContext.js";
import useAPI from "../../hooks/useAPI.js";

export default function ArticleTile(props) {

    const {api, is_authenticated} = useContext(AuthContext)
    const [liked, setLiked] = useState(props.likes?.liked_by_user || false);
    const [likes_count, setLikesCount] = useState(props.likes?.likes_count || 0);
    const {like} = useAPI()

    const likee = async () =>{
        api.post(`api/articles/${props.id}/like/`).then(response=>{
            setLiked(!liked);
            setLikesCount(response.data.likes_count);
        }).catch(error=>{
            console.log(error);
        })
    }

    const {id, date, feast, saint, holiday, author, image, content, title, navigate, is_owner, is_superuser, is_admin, likes} = props
    return (
        <>
            <article className={"article-tile"} onClick={() => navigate(routes["article-detail"].replace(":id", id))}>
                <header>{is_authenticated && (<figure onClick={(e) => {
                    e.stopPropagation();
                    like(props.id, setLiked, setLikesCount)
                }} title={"Харесай"}><LikeStar className={"like-star" + (liked ? " liked" : "")}/></figure>)}</header>
                <figure>
                    {!!image && (<img src={image} alt={title}/>)}
                    {!image && (<img src={saintImage} alt="няма изображение"/>)}

                </figure>
                <main>
                    <h2>{title}</h2>
                    <p>{content.slice(0,45) + "..."}</p>
                    <nav>
                        <ul>
                            {(is_owner(author.id) || is_superuser()) && (<li><Link title={"Изтрий"} onClick={e=>e.stopPropagation()} to={routes["article-delete"].replace(":id", id)}>
                                
                            </Link></li>)}
                            {/*{% if article.can_change or article.is_own %}*/}
                            {(is_owner(author.id) || is_superuser() || is_admin()) && (<li><Link title={"Редактирай"} onClick={e=>e.stopPropagation()} to={routes["article-edit"].replace(":id", id)}>
                                
                            </Link></li>)}
                        </ul>
                    </nav>

                </main>
                <footer onClick={(e)=>{e.stopPropagation(); navigate(routes["user-profile-page"].replace(":id",author?.id))}}>
                    <span title={`Профил на автор: ${author?.username}`} className={"author"} >Автор: {(author?.first_name || author?.last_name) ? `${author?.first_name} ${author?.last_name}` : author?.username}</span>
                    <span title={`Брой харесвания: ${likes_count}`} className={"likes-count"}>Брой харесвания: {likes_count}</span>
                </footer>

            </article>
        </>
    )
}