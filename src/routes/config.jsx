import routes from "./routes.js";
import Base from "../components/common/Base.jsx";
import Calendar from "../components/calendar/Calendar.jsx";

export const routeConfig = [
    { path: routes.home, element: <Base/>, nested: [
            {path: routes["calendar-page"], element: <Calendar/>, nested:[]}
        ] }
]

export default routeConfig