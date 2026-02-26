import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children:[
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: "/auth/register",
                Component: Register
            }

        ]
    }
]);