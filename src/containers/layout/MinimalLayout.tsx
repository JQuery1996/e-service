import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Loader } from "../../features/loader/Loader";
import { useAuth } from "utils/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const MinimalLayout = () => {
    const { authenticatedUser } = useAuth();
    //Unautharized layout
    return !authenticatedUser ? (
        <Suspense fallback={<Loader />}>
            <Outlet></Outlet>
        </Suspense>
    ) : (
        <Navigate to="/" />
    );
};
