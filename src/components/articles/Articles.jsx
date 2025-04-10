import useAPI from "../../hooks/useAPI.js";
import {useContext, useEffect, useState} from "react";
import useOrderedStyles from "../../hooks/useOrderedStyles.js";
import ArticleTile from "./ArticleTile.jsx";
import useAuth from "../../hooks/useAuth.js";
import AuthContext from "../../contexts/AuthContext.js";
import routes from "../../routes/routes.js";
import {useNavigate} from "react-router";
import saintImage from "../../assets/images/articles/saint.webp";


export default function Articles(props) {
    const {
        date, feast, saint, holiday, author
    } = props;

    const {loadArticles, apiMethods, apiLoaded, loadApiFiles} = useAPI();
    const {addStyle} = useOrderedStyles()
    const {is_authenticated} = useContext(AuthContext)
    const [articles, setArticles] = useState([]);
    const [dayData, setDayData] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        addStyle("/articles/articles.css", "articles")
    }, []);

    useEffect(() => {
        loadArticles(date, feast, saint, holiday, author).then(response =>{
            setArticles(response.data.map(article => {
                return <ArticleTile key={article.id} {...article} navigate={navigate}/>
            }))
        }
        )




    },[date, feast, saint, holiday, author]);

    useEffect(() => {
        if(apiLoaded) {
            const {get} = apiMethods
            console.log("apiLoaded")
            get("holidays", {by_date: date, related: true}).then(res => {
                setDayData(res)
                console.log(res)
            })
        } else {
            (async () => await loadApiFiles())();
        }
    }, [apiLoaded])

    const final = []
    let add;

    final.push(
        (<div id="calendar-main">
            <div className="calendar">
                Използван календар:
                <p>{dayData.holidays?.calendar}</p>
            </div>
            <div className="saint">
                <p className="desc">Православни светци, чествани днес:</p>
                {dayData?.saint?.map((item, index) => (<p>{item.name}</p>))}
            </div>
            <div className="feast">
                <p className="desc">Православни празници днес:</p>
                {dayData?.feast?.map((item, index) => (<p>{item.name}</p>))}
            </div>
        </div>)
    )

    if (is_authenticated) {
        add = (
            <>
                <article className="new-article-tile" onClick={() => navigate(routes["article-create"])}>
                    <figure>
                        <img src={saintImage} alt={"няма намерени картички"}/>
                    </figure>
                    <main>
                        <h2 style={{textTransform: "capitalize"}}>добави картичка</h2>
                        <p className="new-article-sign"> + </p>
                    </main>
                </article>
            </>
        )
    }

    final.push( articles.length ? (
        <>
            <p style={{"textTransform": "capitalize"}}>Преглед на картички от статиите</p>
            <section className="article-list">
                {articles}
                {add}
            </section>
        </>
    ) : (
        <>
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
        </>
    ))

    return final
}