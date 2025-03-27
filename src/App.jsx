import { useState } from 'react'
import Calendar from "./components/calendar/Calendar.jsx";
import {IntlProvider} from "react-intl";

function App() {
    const [count, setCount] = useState(0)
    let browserLocale = navigator.language
      return (
        <IntlProvider locale={browserLocale}>
            <Calendar />
            <article style={{minHeight: "50vh"}}> SOmething Here</article>
        </IntlProvider>
      )
}

export default App
