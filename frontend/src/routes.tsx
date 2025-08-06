import {createBrowserRouter} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage.tsx";
import {Error} from "./pages/Error.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {Setup2FA} from "./pages/Setup2FA.tsx";
import {Verify2Fa} from "./pages/Verify2FA.tsx";

export const routes = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                errorElement: <Error />
            },
            {
                path: "/setup-2fa",
                element: <Setup2FA />,
                errorElement: <Error />
            },
            {
                path: "/verify-2fa",
                element: <Verify2Fa />,
                errorElement: <Error />
            }
        ]
    }
]);