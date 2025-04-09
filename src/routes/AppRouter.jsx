import routeConfig from "./config.jsx";
import {Route, Routes} from "react-router-dom";


const AppRouter = () => (
    <Routes>
        {routeConfig.map(({ path, element, nested }, idx) => {
            const nest = nested.map(({ path: nestedPath, element: nestedElement }, nestedIdx) => (
                <Route key={nestedIdx} path={nestedPath} element={nestedElement} />)
            )
           return  (
            <Route key={idx} path={path} element={element} >
                {nest}
            </Route>
        )})}
    </Routes>
);

export default AppRouter;