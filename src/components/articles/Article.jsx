import useAPI from "../../hooks/useAPI.js";
import useOrderedStyles from "../../hooks/useOrderedStyles.js";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext.js";
import {useNavigate, useParams} from "react-router";
import ArticleTile from "./ArticleTile.jsx";

export default function Article(props) {
    const {date, feast, saint, holiday, author, image, content, title} = props
    const {id} = useParams()
    const {loadArticles} = useAPI();
    const {addStyle} = useOrderedStyles()
    const {is_authenticated} = useContext(AuthContext)
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
                        {!article.image && (<img src={'./src/assets/images/articles/saint.webp'} alt="няма изображение"/>)}
                    </figure>
                    <main>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                        <nav>
                            <ul>
                                {/*{% if article.is_own %}*/}
                                {/*<li><a href="{% url "article-delete" article.pk %}">*/}
                                {/*    */}
                                {/*</a></li>*/}
                                {/*{% endif %}*/}
                                {/*{% if article.can_change or article.is_own %}*/}
                                {/*<li><a href="{% url "article-edit" article.pk %}">*/}
                                {/*    */}
                                {/*</a></li>*/}
                                {/*{% endif %}*/}
                            </ul>
                        </nav>
                    </main>
                </article>
            </section>
            </>
            )
            }