import routes from "./routes.js";
import Base from "../components/common/Base.jsx";
import Calendar from "../components/calendar/Calendar.jsx";
import Login from "../components/accounts/Login.jsx";
import Logout from "../components/accounts/Logout.jsx";
import Articles from "../components/articles/Articles.jsx";

export const routeConfig = [
    { path: routes.home, element: <Base/>, nested: [
            {path: routes["home"], element: <Articles/>, nested:[], auth_required: false},
            {path: routes["articles-page"], element: <Articles/>, nested:[], auth_required: false},
            {path: routes["login-page"], element: <Login/>, nested:[], auth_required: false},
            {path: routes["logout-page"], element: <Logout/>, nested:[], auth_required: true},
            {path: routes["calendar-page"], element: <Calendar/>, nested:[], auth_required: false},
        ] }
]

export default routeConfig