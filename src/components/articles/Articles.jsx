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


export default function Articles(props) {
    const {
        date, feast, saint, holiday, author
    } = props;

    const {loadArticles, apiMethods, apiLoaded, loadApiFiles} = useAPI();
    const {addStyle} = useOrderedStyles()
    const {is_authenticated, is_owner, is_superuser, is_admin, user} = useContext(AuthContext)
    const [articles, setArticles] = useState([]);
    const [dayData, setDayData] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        addStyle("/articles/articles.css", "articles")
    }, []);

    useEffect(() => {
        loadArticles(date, feast, saint, holiday, author).then(response =>{
            setArticles(response.data.map(article => {
                return <ArticleTile {...article} key={article.id} is_owner={is_owner} is_superuser={is_superuser} is_admin={is_admin} navigate={navigate}/>
            }))
        }
        )




    },[date, feast, saint, holiday, author, user]);

    useEffect(() => {
        if(apiLoaded && date) {
            const {get} = apiMethods
            console.log("apiLoaded")
            get("holidays", {by_date: date, related: true}).then(res => {
                setDayData(res)
                console.log(res)
            })
        } else {
            (async () => await loadApiFiles())();
        }
    }, [apiLoaded, articles])

    const final = []
    let add;

    final.push(
        date && (<React.Fragment key={"calendar-main"}><div id="calendar-main">
            <div className="calendar">
                Използван календар:
                <p>{dayData?.calendar}</p>
            </div>
            <div className="saint">
                <p className="desc">Православни светци, чествани днес:</p>
                {dayData?.saint?.map((item, index) => (<p key={item.id}>{item.name}</p>))}
            </div>
            <div className="feast">
                <p className="desc">Православни празници днес:</p>
                {dayData?.feast?.map((item, index) => (<p key={item.id}>{item.name}</p>))}
            </div>
        </div></React.Fragment>)
    )

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

    final.push( articles.length ? (
        <React.Fragment key={"articles"}>
            <p style={{"textTransform": "capitalize"}}>Преглед на картички от статиите</p>
            <section className="article-list">
                {articles}
                {add}
            </section>
        </React.Fragment>
    ) : (
        <React.Fragment key={"no-articles"}>
            <section className="article-list">
            <article>
                <figure>
                    <img src={saintImage} alt={"няма намерени картички"}/>
                </figure>
                <main>
                    <h2 style={{textTransform: "capitalize"}}>Няма картички за този ден</h2>
                    <p>Все още няма добавени картички за този ден</p>
                </main>
            </article>
            </section>
        </React.Fragment>
    ))

    return final
}