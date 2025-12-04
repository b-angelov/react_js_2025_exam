import useAPI from "../../hooks/useAPI.js";
import useOrderedStyles from "../../hooks/useOrderedStyles.js";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext.js";
import {Link, useNavigate, useParams} from "react-router";
import ArticleTile from "./ArticleTile.jsx";
import saintImage from "../../assets/images/articles/saint.webp";
import routes from "../../routes/routes.js";

export default function Article(props) {
    const {date, feast, saint, holiday, author, image, content, title} = props
    const {id} = useParams()
    const {loadArticles} = useAPI();
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
            }
        )
    },[date, feast, saint, holiday, author]);

    return (
        <>
            <section className="single-article">
                <article>
                    <figure>
                        {!!article.image && (<img src={article.image} alt={article.title}/>)}
                        {!article.image && (<img src={saintImage} alt="няма изображение"/>)}
                    </figure>
                    <main>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                        <nav>
                            <ul>
                                {(is_owner(article.author) || is_superuser()) && (<li><Link to={routes["article-delete"].replace(":id", article.id)} onClick={e=>e.stopPropagation()}>
                                    
                                </Link></li>)}
                                {/*{% if article.can_change or article.is_own %}*/}
                                {(is_owner(article.author) || is_superuser() || is_admin()) && (<li><Link onClick={e=>e.stopPropagation()} to={routes["article-edit"].replace(":id", article.id)}>
                                    
                                </Link></li>)}
                            </ul>
                        </nav>
                    </main>
                </article>
            </section>
            </>
            )
            }