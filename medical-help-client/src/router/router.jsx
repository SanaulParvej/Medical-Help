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
import NursingCare from "../pages/NursingCare/NursingCare";
import AdminRoutes from "../routes/AdminRoutes";
import AllDoctors from "../pages/Admin/AllDoctors/AllDoctors";
import AddDoctor from "../pages/Admin/AddDoctor/AddDoctor";
import AllAppointments from "../pages/Admin/AllAppointments/AllAppointments";
import Loading from "../Component/Loader/Loading";
import AllBookings from "../pages/Admin/AllBookings/AllBookings";
import NursingCareBookings from "../pages/Admin/AllBookings/NursingCareBookings/NursingCareBookings";
import AllUsers from "../pages/Admin/AllUsers/AllUsers";
import EmergencyService from "../pages/EmergencyService/EmergencyService";
import HomeCare from "../pages/HomeCare/HomeCare";
import MyBookings from "../pages/User/MyBookings/MyBookings";
import Physiotherapy from "../pages/Physiotherapy/Physiotherapy";
import MyAppointments from "../pages/User/MyAppointments/MyAppointments";
import MyProfile from "../pages/User/MyProfile/MyProfile";
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
                path: '/physiotherapy-services',
                Component: Physiotherapy
            },
            {
                path: '/nursing-care-services',
                Component: NursingCare
            },
            {
                path: '/home-care-services',
                Component: HomeCare
            },
            {
                path: '/services',
                Component: Services
            },
            {
                path: '/emergency-service',
                Component: EmergencyService
            },
            {
                path: '/doctors',
                hydrateFallbackElement: <h1 className="loading loading-bars"></h1>,
                loader: () => fetch("https://medical-help-server.vercel.app/doctors"),
                Component: Doctors
            },
            {
                path: '/doctor/:id',
                loader: ({ params }) => fetch(`https://medical-help-server.vercel.app/doctors/${params.id}`).then(res => res.json()),
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
            },
            {
                path: '/dashboard/all-doctors',
                hydrateFallbackElement: <Loading></Loading>,
                loader: () => fetch("https://medical-help-server.vercel.app/doctors"),
                element: <PrivateRoutes> <AdminRoutes> <AllDoctors></AllDoctors> </AdminRoutes> </PrivateRoutes>
            },
            {
                path: '/dashboard/add-doctor',
                element: <PrivateRoutes> <AdminRoutes> <AddDoctor></AddDoctor> </AdminRoutes> </PrivateRoutes>
            },
            {
                path: '/dashboard/all-appointments',
                hydrateFallbackElement: <Loading></Loading>,
                loader: () => fetch("https://medical-help-server.vercel.app/appointments"),
                element: <PrivateRoutes> <AdminRoutes> <AllAppointments></AllAppointments> </AdminRoutes> </PrivateRoutes>
            },
            {
                path: '/dashboard/all-bookings',
                hydrateFallbackElement: <Loading></Loading>,
                element: <PrivateRoutes> <AdminRoutes> <AllBookings></AllBookings> </AdminRoutes> </PrivateRoutes>
            },
            {
                path: '/dashboard/all-bookings/nursing',
                hydrateFallbackElement: <Loading></Loading>,
                loader: () => fetch("https://medical-help-server.vercel.app/doctors"),
                element: <PrivateRoutes> <AdminRoutes> <NursingCareBookings></NursingCareBookings> </AdminRoutes> </PrivateRoutes>
            },
            {
                path: '/dashboard/all-users',
                hydrateFallbackElement: <Loading></Loading>,
                loader: () => fetch("https://medical-help-server.vercel.app/users"),
                element: <PrivateRoutes> <AdminRoutes> <AllUsers></AllUsers> </AdminRoutes> </PrivateRoutes>
            },
            {
                path: '/dashboard/my-appointments',
                element: <PrivateRoutes><MyAppointments></MyAppointments></PrivateRoutes>
            },
            {
                path: '/dashboard/my-bookings',
                element: <PrivateRoutes><MyBookings></MyBookings></PrivateRoutes>
            },
            {
                path: 'my-profile',
                element: <PrivateRoutes> <MyProfile></MyProfile> </PrivateRoutes>
            }
        ]
        
    }
]);
