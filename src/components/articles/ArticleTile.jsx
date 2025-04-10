import routes from "../../routes/routes.js";

export default function ArticleTile(props) {

    const {id, date, feast, saint, holiday, author, image, content, title, navigate} = props

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
                            {/*{% if article.is_own %}*/}
                            {/*<li><a href="{% url " article-delete" article.pk %}">*/}
                            {/*    */}
                            {/*</a></li>*/}
                            {/*{% endif %}*/}
                            {/*{% if article.can_change or article.is_own %}*/}
                            {/*<li><a href="{% url " article-edit" article.pk %}">*/}
                            {/*    */}
                            {/*</a></li>*/}
                            {/*{% endif %}*/}
                        </ul>
                    </nav>

                </main>

            </article>
        </>
    )
}