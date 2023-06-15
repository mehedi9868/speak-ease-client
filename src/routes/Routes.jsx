import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Dashboard from "../layout/Dashboard";
import AllClasses from "../pages/AllClasses/AllClasses";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import MySelectedClasses from "../pages/Dashboard/MySelectedClasses/MySelectedClasses";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import MyEnrolledClasses from "../pages/Dashboard/MyEnrolledClasses/MyEnrolledClasses";
import Instructors from "../pages/Instructors/Instructors";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/classes",
                element: <AllClasses></AllClasses>,
            },
            {
                path: "/instructors",
                element: <Instructors></Instructors>,
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "add-classes",
                element: <InstructorRoute><AddClass></AddClass></InstructorRoute>,
            },
            {
                path: 'manage-classes',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>,
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
            },
            {
                path: 'my-classes',
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>,
            },
            {
                path: 'my-selected-classes',
                element: <StudentRoute><MySelectedClasses></MySelectedClasses></StudentRoute>,
            },
            {
                path: 'payment/:id',
                element: <StudentRoute><Payment></Payment></StudentRoute>,
                loader: ({ params }) => fetch(`https://speak-ease-server.vercel.app/selected-class/${params.id}`)
            },
            {
                path: 'payment-history',
                element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>,
            },
            {
                path: 'my-enrolled-classes',
                element: <StudentRoute><MyEnrolledClasses></MyEnrolledClasses></StudentRoute>,
            },

        ]
    }
]);

export default router;