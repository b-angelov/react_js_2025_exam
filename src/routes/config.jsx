import routes from "./routes.js";
import Base from "../components/common/Base.jsx";
import Calendar from "../components/calendar/Calendar.jsx";
import Login from "../components/accounts/Login.jsx";
import Logout from "../components/accounts/Logout.jsx";

export const routeConfig = [
    { path: routes.home, element: <Base/>, nested: [
            {path: routes["login-page"], element: <Login/>, nested:[], auth_required: false},
            {path: routes["logout-page"], element: <Logout/>, nested:[], auth_required: true},
            {path: routes["calendar-page"], element: <Calendar/>, nested:[], auth_required: false},
        ] }
]

export default routeConfig