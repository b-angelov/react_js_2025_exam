import calendar_styles from "/src/assets/calendar/css/calendar.module.css"
import ListItem from "./ListItem.jsx";
import {useContext, useEffect, useState} from "react";
import CalendarContext from "../../contexts/CalendarContext.js";
import {getMonthMatrix} from "../../assets/calendar/utils/month.js";
import {useIntl} from "react-intl";
import useAPI from "../../hooks/useAPI.js";

export default function Calendar(){

    const [calendarItems, setCalendarItems] = useState([])
    const intl = useIntl()
    const date = new Date();
    const {apiMethods, apiLoaded, loadApiFiles} = useAPI()
    const {get} = apiMethods

    useEffect(() => {
        if(apiLoaded) {
            get("holidays", {by_month: date.getMonth() + 1, year: date.getFullYear()})
                .then(res => {
                    let items = getMonthMatrix(res, intl.locale)
                    items = items[Math.floor(date.getDate() / 7)]
                    items = setCalendarItems(items.map((item, index) => (<ListItem key={"calendar-list" + index} {...item} />)))
                    return items
                })
                .catch(error => console.error(error))
        } else{
            (async () => await loadApiFiles())();
        }
    },[apiLoaded])

    return (
        <CalendarContext.Provider value={{

        }}>
            <article className={calendar_styles.calendar_holder}>
        <h1>Православен Календар</h1>
            {/*partial:index.partial.html*/}
            {/* days sourced from: https://nationaldaycalendar.com/february/ */}
            <h1>{new Intl.DateTimeFormat(intl.locale,{month:"long"}).format(date)} {date.getFullYear()}</h1>
            <p>Седмица {Math.floor(date.getDate() /  7)+1}</p>
            <ul>
                {calendarItems}
            </ul>
            {/*!--partial--*/}
            </article>
        </CalendarContext.Provider>
    )
}