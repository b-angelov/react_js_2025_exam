import routes from "../../routes/routes.js";
import {Link} from "react-router";
import saintImage from "../../assets/images/articles/saint.webp";

export default function ArticleTile(props) {

    const {id, date, feast, saint, holiday, author, image, content, title, navigate, is_owner, is_superuser, is_admin} = props

    return (
        <>
            <article className={"article-tile"} onClick={() => navigate(routes["article-detail"].replace(":id", id))}>
                <figure>
                    {!!image && (<img src={image} alt={title}/>)}
                    {!image && (<img src={saintImage} alt="няма изображение"/>)}

                </figure>
                <main>
                    <h2>{title}</h2>
                    <p>{content.slice(0,75) + "..."}</p>
                    <nav>
                        <ul>
                            {(is_owner(author.id) || is_superuser()) && (<li><Link onClick={e=>e.stopPropagation()} to={routes["article-delete"].replace(":id", id)}>
                                
                            </Link></li>)}
                            {/*{% if article.can_change or article.is_own %}*/}
                            {(is_owner(author.id) || is_superuser() || is_admin()) && (<li><Link onClick={e=>e.stopPropagation()} to={routes["article-edit"].replace(":id", id)}>
                                
                            </Link></li>)}
                        </ul>
                    </nav>

                </main>
                <footer onClick={(e)=>{e.stopPropagation(); navigate(routes["user-profile-page"].replace(":id",author?.id))}}>
                    <span className={"author"} >Автор: {(author?.first_name || author?.last_name) ? `${author?.first_name} ${author?.last_name}` : author?.username}</span>
                </footer>

            </article>
        </>
    )
}