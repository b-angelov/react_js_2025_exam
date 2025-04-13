import React from "react";
import styles from "../../assets/css/articles/DateCalendar.module.css";

export default function DateCalendar({calendar,saint,feast}) {
    return(
        <>
        <section className={styles.section}><article><div id="calendar-main">
            <div className="calendar">
                <div>Използван календар:</div>
                <p>{calendar}</p>
            </div>
            <div className="saint">
                <p className="desc">Православни светци, чествани днес:</p>
                {saint?.map((item, index) => (<p key={item.id}>{item.name}</p>))}
            </div>
            <div className="feast">
                <p className="desc">Православни празници днес:</p>
                {feast?.map((item, index) => (<p key={item.id}>{item.name}</p>))}
            </div>
        </div></article></section>
            </>
    )
}