import { useState } from 'react'
import Calendar from "./components/calendar/Calendar.jsx";
import {IntlProvider} from "react-intl";
import Base from "./components/common/Base.jsx";

function App() {
    const [count, setCount] = useState(0)
    let browserLocale = navigator.language
      return (
        <IntlProvider locale={browserLocale}>
            <Base />
            <article style={{minHeight: "50vh"}}> SOmething Here</article>
        </IntlProvider>
      )
}

export default App
