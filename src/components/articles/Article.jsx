import useAPI from "../../hooks/useAPI.js";
import useOrderedStyles from "../../hooks/useOrderedStyles.js";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext.js";
import {Link, useNavigate, useParams} from "react-router";
import ArticleTile from "./ArticleTile.jsx";
import saintImage from "../../assets/images/articles/saint.webp";
import routes from "../../routes/routes.js";
import {LikeStar} from "../common/LikeStar.jsx";
import Markdown from "react-markdown";

export default function Article(props) {
    const {date, feast, saint, holiday, author, image, content, title, likes} = props
    const [liked, setLiked] = useState(likes?.liked_by_user || false);
    const [likes_count, setLikesCount] = useState(0);
    const {id} = useParams()
    const {loadArticles,like} = useAPI();
    const {addStyle} = useOrderedStyles()
    const {is_authenticated, is_owner, is_admin, is_superuser} = useContext(AuthContext)
    const [article, setArticle] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        addStyle("/articles/article.css", "articles")
    }, []);

    useEffect(() => {
        loadArticles(date, feast, saint, holiday, author, id).then(response =>{
                setArticle(
                    response?.data[0]
                )
                setLikesCount(response.data[0]?.likes?.likes_count || 0)
                setLiked(response.data[0]?.likes?.liked_by_user || false)
            }
        )
    },[date, feast, saint, holiday, author]);

    return (
        <>
            <section className="single-article">
                <article>
                    <header>{is_authenticated && (<figure onClick={(e) => {
                        e.stopPropagation();
                        like(id, setLiked, setLikesCount)
                    }} title={"Харесай"}><LikeStar className={"like-star" + (liked ? " liked" : "")}/></figure>)}</header>
                    <figure>
                        {!!article.image && (<img src={article.image} alt={article.title}/>)}
                        {!article.image && (<img src={saintImage} alt="няма изображение"/>)}
                    </figure>
                    <main>
                        <h2>{article.title}</h2>
                        <p><Markdown>{article.content}</Markdown></p>
                        <nav>
                            <ul>
                                {(is_owner(article?.author?.id) || is_superuser()) && (<li><Link title={"Изтрий"} to={routes["article-delete"].replace(":id", article.id)} onClick={e=>e.stopPropagation()}>
                                    
                                </Link></li>)}
                                {/*{% if article.can_change or article.is_own %}*/}
                                {(is_owner(article?.author?.id) || is_superuser() || is_admin()) && (<li><Link title={"Редактирай"} onClick={e=>e.stopPropagation()} to={routes["article-edit"].replace(":id", article.id)}>
                                    
                                </Link></li>)}
                            </ul>
                        </nav>
                    </main>
                    <footer onClick={(e)=>{e.stopPropagation(); navigate(routes["user-profile-page"].replace(":id",article?.author?.id))}}>
                        <span title={"Профил на автора"} className={"author"}>Автор: {(article?.author?.first_name || article?.author?.last_name) ? `${article?.author?.first_name} ${article?.author?.last_name}` : article?.author?.username}</span>
                        <span title={"Брой харесвания"} className={"likes-count"}>Брой харесвания: {likes_count}</span>
                    </footer>
                </article>
            </section>
            </>
            )
            }