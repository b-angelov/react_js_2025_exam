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
import Profile from "../components/accounts/Profile.jsx";
import ProfileEdit from "../components/accounts/ProfileEdit.jsx";
import ProfileDelete from "../components/accounts/ProfileDelete.jsx";
import Register from "../components/accounts/Register.jsx";

export const routeConfig = [
    { path: routes.home, element: <Base/>, nested: [
            {path: routes["home"], element: <Articles title={"Картички за днес"} date={new Date().toISOString().split('T')[0]}/>, nested:[], auth_required: false},
            {path: routes["all-articles"], element: <Articles no_cards_title={"Няма картички"} no_cards_desc={"Все още няма никакви създадени картички"}/>, nested:[], auth_required: false},
            {path: routes["user-articles"], element: <MyArticles/>, nested:[], auth_required: true},
            {path: routes["article-detail"], element: <Article/>, nested:[], auth_required: false},
            {path: routes["article-create"], element: <ArticleCreate/>, nested:[], auth_required: true},
            {path: routes["article-edit"], element: <UpdateArticle/>, nested:[], auth_required: true},
            {path: routes["article-delete"], element: <DeleteArticle/>, nested:[], auth_required: true},
            {path: routes["login-page"], element: <Login/>, nested:[], auth_required: false},
            {path: routes["logout-page"], element: <Logout/>, nested:[], auth_required: true},
            {path: routes["calendar-page"], element: <Calendar/>, nested:[], auth_required: false},
            {path: routes["profile-page"], element: <Profile/>, nested:[], auth_required: true},
            {path: routes["profile-edit-page"], element: <ProfileEdit/>, nested:[], auth_required: true},
            {path: routes["profile-delete-page"], element: <ProfileDelete/>, nested:[], auth_required: true},
            {path:routes["register-page"], element:<Register/>, nested:[], auth_required:false},
        ] }
]

export default routeConfig