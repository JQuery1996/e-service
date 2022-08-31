// import { lazy } from "react";

// project imports
import { MainLayout } from "containers/layout";
import { lazy } from "react";

const Home = lazy(() => import("pages/home"));
const Service = lazy(() => import("pages/service"));
const Profile = lazy(() => import("pages/profile"));
const FilterServices = lazy(() => import("pages/filterServices"));
const ReqestedServices = lazy(() => import("pages/requestedServices"));
const SelectPayment = lazy(() => import("pages/selectPayment"));
const PaymentResult = lazy(() => import("pages/paymentResult"));
const BuyService = lazy(() => import("pages/buyService"));

// ==============================|| MAIN ROUTING ||============================== //

const ProtectedRoutes = {
    path: "/",
    element: <MainLayout />,
    expect: true,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/service/:id",
            element: <Service />,
            expect: true,
        },
        {
            path: "/service/select-patment",
            element: <SelectPayment />,
            expect: true,
        },
        {
            path: "/service/buy",
            element: <BuyService />,
            expect: true,
        },
        {
            path: "/profile",
            element: <Profile />,
        },
        {
            path: "/service/filter",
            expect: true,
            element: <FilterServices />,
        },
        {
            path: "/service/requested",
            expect: true,
            element: <ReqestedServices />,
        },
        {
            path: "/service/result",
            expect: true,
            element: <PaymentResult />,
        },
        {
            path: "*",
            element: <Home />,
        },
    ],
};

// let ProtectedRoutes = [
// {
//   element: <MainLayout />,
//   expect: true,
//   path: "/",
//   children: [
//     {
//       path: "/",
//       element: <Home />,
//     },
//     {
//       path: "/service/:id",
//       element: <Service />,
//       expect: true,
//     },
//     {
//       path: "/profile",
//       element: <Profile />,
//     },
//     {
//       path: "/service/filter",
//       expect: true,
//       element: <FilterServices />,
//     },
//     {
//       path: "/service/requested",
//       expect: true,
//       element: <ReqestedServices />,
//     },
//     // {
//     //   path: "/login",
//     //   expect: true,
//     //   element: <Login />,
//     // },
//     // {
//     //   path: "*",
//     //   element: <Home />,
//     // },
//   ],
// },
// {
//   element: <AuthLayout />,
//   children: [
//     {
//       path: "/login",
//       element: <Login />,
//     },

//   ],
// },
// ];

export default ProtectedRoutes;
