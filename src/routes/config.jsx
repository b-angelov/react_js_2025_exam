import routes from "./routes.js";
import Base from "../components/common/Base.jsx";
import Calendar from "../components/calendar/Calendar.jsx";
import Login from "../components/accounts/Login.jsx";
import Logout from "../components/accounts/Logout.jsx";
import Articles from "../components/articles/Articles.jsx";
import Article from "../components/articles/Article.jsx";
import ArticleCreate from "../components/articles/ArticleCreate.jsx";
import MyArticles from "../components/articles/MyArticles.jsx";
import DeleteArticle from "../components/articles/DeleteArticle.jsx";
import UpdateArticle from "../components/articles/UpdateArticle.jsx";

export const routeConfig = [
    { path: routes.home, element: <Base/>, nested: [
            {path: routes["home"], element: <Articles date={new Date().toISOString().split('T')[0]}/>, nested:[], auth_required: false},
            {path: routes["all-articles"], element: <Articles/>, nested:[], auth_required: false},
            {path: routes["user-articles"], element: <MyArticles/>, nested:[], auth_required: true},
            {path: routes["article-detail"], element: <Article/>, nested:[], auth_required: false},
            {path: routes["article-create"], element: <ArticleCreate/>, nested:[], auth_required: true},
            {path: routes["article-edit"], element: <UpdateArticle/>, nested:[], auth_required: true},
            {path: routes["article-delete"], element: <DeleteArticle/>, nested:[], auth_required: true},
            {path: routes["login-page"], element: <Login/>, nested:[], auth_required: false},
            {path: routes["logout-page"], element: <Logout/>, nested:[], auth_required: true},
            {path: routes["calendar-page"], element: <Calendar/>, nested:[], auth_required: false},
        ] }
]

export default routeConfig