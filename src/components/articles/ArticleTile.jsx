import routes from "../../routes/routes.js";
import {Link} from "react-router";

export default function ArticleTile(props) {

    const {id, date, feast, saint, holiday, author, image, content, title, navigate, is_owner, is_superuser, is_admin} = props

    return (
        <>
            <article onClick={() => navigate(routes["article-detail"].replace(":id", id))}>
                <figure>
                    {!!image && (<img src={image} alt={title}/>)}
                    {!image && (<img src={'./src/assets/images/articles/saint.webp'} alt="няма изображение"/>)}

                </figure>
                <main>
                    <h2>{title}</h2>
                    <p>{content.slice(0,75) + "..."}</p>
                    <nav>
                        <ul>
                            {(is_owner() || is_superuser()) && (<li><Link onClick={e=>e.stopPropagation()} to={routes["article-delete"].replace(":id", id)}>
                                
                            </Link></li>)}
                            {/*{% if article.can_change or article.is_own %}*/}
                            {(is_owner() || is_superuser() || is_admin()) && (<li><Link onClick={e=>e.stopPropagation()} to={routes["article-edit"].replace(":id", id)}>
                                
                            </Link></li>)}
                        </ul>
                    </nav>

                </main>

            </article>
        </>
    )
}