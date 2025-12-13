import calendar_styles from "/src/assets/calendar/css/calendar.module.css"
import ListItem from "./ListItem.jsx";
import React, { useContext, useEffect, useState} from "react";
import CalendarContext from "../../contexts/CalendarContext.js";
import {getMonthMatrix} from "../../assets/calendar/utils/month.js";
import {useIntl} from "react-intl";
import useAPI from "../../hooks/useAPI.js";
import DateCalendar from "../articles/DateCalendar.jsx";
import DateText from "../common/DateText.jsx";

export default function Calendar({date: propDate}) {

    const [calendarItems, setCalendarItems] = useState([])
    const [apiResponseItems, setApiResponseItems] = useState([])
    const [reloadFlag, setReloadFlag] = useState(false)
    const [dayData, setDayData] = useState({})
    const intl = useIntl()
    const [date,setDate] = useState(new Date(propDate || Date.now()));
    const {apiMethods, apiLoaded, loadApiFiles} = useAPI()
    const {get} = apiMethods

    useEffect(() => {
        if(apiLoaded) {
            get("holidays", {by_month: date.getMonth() + 1, year: date.getFullYear()})
                .then(res => {
                    setApiResponseItems(res)
                    let items = getMonthMatrix(res, intl.locale)
                    items = items[Math.ceil((date.getDate() - (date.getDay() || 7)) / 7)]
                    items = setCalendarItems(items.map((item, index) => (<ListItem active={(date.getDay() || 7) === index+1} currentDate={date} setDate={setDate} key={"calendar-list" + index} {...item} />)))
                    get("holidays", {by_date: date.toISOString("YYYY-MM-DD").split("T")[0], related: true}).then(res => {
                        setDayData(res)
                    })
                    return items
                })
                .catch(error => console.error(error))
        } else{
            (async () => await loadApiFiles())();
        }
    },[apiLoaded, reloadFlag])

    useEffect(() => {
        if(apiResponseItems.length){
            let items = getMonthMatrix(apiResponseItems, intl.locale)
            items = items[Math.ceil((date.getDate() - (date.getDay() || 7)) / 7)]
            setCalendarItems(items.map((item, index) => (<ListItem active={(date.getDay() || 7) === index+1} currentDate={date} setDate={setDate} key={"calendar-list" + index} {...item} />)))
            get("holidays", {by_date: date.toISOString("YYYY-MM-DD").split("T")[0], related: true}).then(res => {
                setDayData(res)
            })
        }
    },[date])

    return (
        <CalendarContext.Provider value={{

        }}>
            <article className={calendar_styles.calendar_holder}>
        <h1>Православен Календар</h1>
            {/*partial:index.partial.html*/}
            {/* days sourced from: https://nationaldaycalendar.com/february/ */}
                <DateText value={date} onChange={(dateValue)=>{setDate(new Date(dateValue)); setReloadFlag(!reloadFlag)}}><h1>{new Intl.DateTimeFormat(intl.locale,{month:"long"}).format(date)} {date.getFullYear()}</h1></DateText>
            <p>Седмица {Math.floor((date.getDate() - (date.getDay() || 7)) /  7)+1}</p>
            <ul>
                {calendarItems}
            </ul>
            {/*!--partial--*/}
            </article>

            {dayData && (<React.Fragment key={"calendar-main"}><DateCalendar {...dayData}/></React.Fragment>)}
        </CalendarContext.Provider>
    )
}