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
                path: "/all-classes",
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
        ]
    }
]);

export default router;