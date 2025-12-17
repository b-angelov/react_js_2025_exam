import useAPI from "../../hooks/useAPI.js";
import {useContext, useEffect, useState} from "react";
import useOrderedStyles from "../../hooks/useOrderedStyles.js";
import ArticleTile from "./ArticleTile.jsx";
import useAuth from "../../hooks/useAuth.js";
import AuthContext from "../../contexts/AuthContext.js";
import routes from "../../routes/routes.js";
import {useNavigate} from "react-router";
import saintImage from "../../assets/images/articles/saint.webp";
import React from "react";
import DateCalendar from "./DateCalendar.jsx";
import favicon from "../../assets/images/favicon.png";
import TilePlaceholder from "./TilePlaceholder.jsx";


export default function Articles(props) {
    const {
        date, feast, saint, holiday, author, title, no_cards_title, no_cards_desc, favorites
    } = props;

    const {loadArticles, apiMethods, apiLoaded, loadApiFiles} = useAPI();
    const {addStyle} = useOrderedStyles()
    const {is_authenticated, is_owner, is_superuser, is_admin, user} = useContext(AuthContext)
    const [articles, setArticles] = useState([]);
    const [dayData, setDayData] = useState({});
    const navigate = useNavigate();
    const placeholder = []


    useEffect(() => {
        addStyle("/articles/articles.css", "articles")
    }, []);

    useEffect(() => {
        loadArticles(date, feast, saint, holiday, author, null, favorites).then(response =>{
            setArticles(response.data.map(article => {
                return <ArticleTile {...article} key={article.id} is_owner={()=>is_owner(article.author.id)} is_superuser={is_superuser} is_admin={is_admin} navigate={navigate}/>
            }))
        }
        )




    },[date, feast, saint, holiday, author, user]);

    useEffect(() => {
        if(apiLoaded && date) {
            const {get} = apiMethods
            get("holidays", {by_date: date, related: true}).then(res => {
                setDayData(res)
            })
        } else {
            (async () => await loadApiFiles())();
        }
    }, [apiLoaded, articles])

    const final = []
    let add;

    if (is_authenticated) {
        add = (
            <React.Fragment key={"add-article"}>
                <article className="new-article-tile" onClick={() => navigate(routes["article-create"])}>
                    <figure>
                        <img src={saintImage} alt={"няма намерени картички"}/>
                    </figure>
                    <main>
                        <h2 style={{textTransform: "capitalize"}}>добави картичка</h2>
                        <p className="new-article-sign"> + </p>
                    </main>
                </article>
            </React.Fragment>
        )
    }

    if(!articles.length || (!is_authenticated && articles.length % 2 === 1)) {
        const fragment = <TilePlaceholder key={"article-tile-placeholder"}/>
        articles.length ? articles.push(fragment) : placeholder.push(fragment)
    }

    final.push( articles.length ? (
        <React.Fragment key={"articles"}>
            <p style={{"textTransform": "capitalize"}}>{title || "Преглед на картички от статиите"}</p>
            <section className="article-list">
                {articles}
                {add}
                {placeholder}
            </section>
        </React.Fragment>
    ) : (
        <React.Fragment key={"no-articles"}>
            <p style={{"textTransform": "capitalize"}}>{title || "Преглед на картички от статиите"}</p>
            <section className="article-list">
            <article>
                <figure>
                    <img src={saintImage} alt={"няма намерени картички"}/>
                </figure>
                <main>
                    <h2 style={{textTransform: "capitalize"}}>{no_cards_title ||"Няма картички за този ден"}</h2>
                    <p>{no_cards_desc || "Все още няма добавени картички свързани с този ден"}</p>
                </main>
            </article>
                {add || placeholder}
            </section>
        </React.Fragment>
    ))

    final.push(
        date && (<React.Fragment key={"calendar-main"}><DateCalendar {...dayData}/></React.Fragment>)
    )

    return final
}