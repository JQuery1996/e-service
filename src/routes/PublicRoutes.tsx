// import { lazy } from "react";

// project imports
import { MinimalLayout } from "containers/layout";
import { lazy } from "react";
import { RouteObject } from "react-router";

const Login = lazy(() => import("pages/login"));
const ResetPassword = lazy(() => import("pages/resetPassword"));
const Verify = lazy(() => import("pages/verify"));
const Register = lazy(() => import("pages/register"));
const SelectCountry = lazy(() => import("pages/selectCountry"));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const PublicRoutes: RouteObject = {
    path: "/auth",
    element: <MinimalLayout />,
    children: [
        {
            path: "login",
            // there is no expect property in RouterObject
            // expect: true,
            element: <Login />,
        },
        {
            path: "reset-password",
            // expect: true,
            element: <ResetPassword />,
        },
        {
            path: "verify",
            // expect: true,
            element: <Verify />,
        },
        {
            path: "register",
            // expect: true,
            element: <Register />,
        },
        {
            path: "select-country",
            // expect: true,
            element: <SelectCountry />,
        },
    ],
};

export default PublicRoutes;
