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
                {/*<li><time dateTime="2022-02-01">1</time>Dark Chocolate Day</li>*/}
                {/*<li><time dateTime="2022-02-02">2</time>Groundhog Day</li>*/}
                {/*<li><time dateTime="2022-02-03">3</time>Carrot Cake Day</li>*/}
                {/*<li><time dateTime="2022-02-04">4</time>Wear Red Day</li>*/}
                {/*<li><time dateTime="2022-02-05">5</time>Weatherperson's Day</li>*/}
                {/*<li><time dateTime="2022-02-06">6</time>Chopsticks Day</li>*/}
                {/*<li><time dateTime="2022-02-07">7</time>Periodic Table Day</li>*/}
                {/*<li><time dateTime="2022-02-08">8</time>Kite Flying Day</li>*/}
                {/*<li><time dateTime="2022-02-09">9</time>Pizza Day</li>*/}
                {/*<li><time dateTime="2022-02-10">10</time>Umbrella Day</li>*/}
                {/*<li><time dateTime="2022-02-11">11</time>Inventor's Day</li>*/}
                {/*<li><time dateTime="2022-02-12">12</time>Global Movie Day</li>*/}
                {/*<li><time dateTime="2022-02-13">13</time>Tortellini Day</li>*/}
                {/*<li><time dateTime="2022-02-14">14</time>Valentine's Day</li>*/}
                {/*<li><time dateTime="2022-02-15">15</time>Gumdrop Day</li>*/}
                {/*<li><time dateTime="2022-02-16">16</time>Do a Grouch a Favor Day</li>*/}
                {/*<li><time dateTime="2022-02-17">17</time>Cabbage Day</li>*/}
                {/*<li><time dateTime="2022-02-18">18</time>Battery Day</li>*/}
                {/*<li className="today"><time dateTime="2022-02-19">19</time>Chocolate Mint Day</li>*/}
                {/*<li><time dateTime="2022-02-20">20</time>Love Your Pet Day</li>*/}
                {/*<li><time dateTime="2022-02-21">21</time>President's Day</li>*/}
                {/*<li><time dateTime="2022-02-22">22</time>Cook a Sweet Potato Day</li>*/}
                {/*<li><time dateTime="2022-02-23">23</time>Tile Day</li>*/}
                {/*<li><time dateTime="2022-02-24">24</time>Toast Day</li>*/}
                {/*<li><time dateTime="2022-02-25">25</time>Clam Chowder Day</li>*/}
                {/*<li><time dateTime="2022-02-26">26</time>Pistachio Day</li>*/}
                {/*<li><time dateTime="2022-02-27">27</time>Polar Bear Day</li>*/}
                {/*<li><time dateTime="2022-02-28">28</time>Tooth Fairy Day</li>*/}
            </ul>
            {/*!--partial--*/}
            </article>
        </CalendarContext.Provider>
    )
}