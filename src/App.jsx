import {useState} from 'react'
import Calendar from "./components/calendar/Calendar.jsx";
import {IntlProvider} from "react-intl";
import Base from "./components/common/Base.jsx";
import AppRouter from "./routes/AppRouter.jsx";
import {BrowserRouter} from "react-router-dom";
import AuthProvider from "./providers/authProvider.jsx";

function App() {
    const [count, setCount] = useState(0)
    let browserLocale = navigator.language
    return (
        <BrowserRouter>
            <IntlProvider locale={browserLocale}>
                <AuthProvider>
                    <AppRouter/>
                </AuthProvider>
            </IntlProvider>
        </BrowserRouter>
    )
}

export default App
