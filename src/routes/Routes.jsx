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
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "add-classes",
                element: <AddClass></AddClass>,
            },
            {
                path: 'manage-classes',
                element: <ManageClasses></ManageClasses>,
            },
            {
                path: 'manage-users',
                element: <ManageUsers></ManageUsers>,
            },
            {
                path: 'my-classes',
                element: <MyClasses></MyClasses>,
            },
            {
                path: 'my-selected-classes',
                element: <MySelectedClasses></MySelectedClasses>,
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://speak-ease-server.vercel.app/selected-class/${params.id}`)
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>,
            },
            {
                path: 'my-enrolled-classes',
                element: <MyEnrolledClasses></MyEnrolledClasses>,
            },

        ]
    }
]);

export default router;