import routeConfig from "./config.jsx";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute.jsx";

const AppRouter = () => (
    <Routes>
        {routeConfig.map(({path, element, nested, auth_required}, idx) => (
            <Route key={idx} path={path} element={element}>
                {nested.map(({path: nestedPath, element: nestedElement, auth_required}, nestedIdx) => (
                    auth_required ? (
                        <Route key={nestedIdx} path={nestedPath} element={<ProtectedRoute />}>
                            <Route index element={nestedElement} />
                        </Route>
                    ) : (
                        <Route key={nestedIdx} path={nestedPath} element={nestedElement} />
                    )
                ))}
            </Route>
        ))}
    </Routes>
);

export default AppRouter;