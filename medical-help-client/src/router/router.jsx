import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Services from "../pages/Services/Services";
import PrivateRoutes from "../routes/PrivateRoutes";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import Doctors from "../pages/Doctors/Doctors";
import Dashboard from "../pages/DashboardHome/Dashboard"
import DoctorDetails from "../pages/DoctorDetails/DoctorDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/services',
                Component: Services
            },
            {
                path: '/doctors',
                hydrateFallbackElement: <h1 className="loading loading-bars"></h1>,
                loader: () => fetch("http://localhost:4000/doctors"),
                Component: Doctors
            },
            {
                path: '/doctor/:id',
                loader: ({ params }) => fetch(`http://localhost:4000/doctors/${params.id}`).then(res => res.json()),
                Component: DoctorDetails
            }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: "/auth/register",
                Component: Register
            }

        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                index: true,
                Component: Dashboard
            }
        ]
    }
]);