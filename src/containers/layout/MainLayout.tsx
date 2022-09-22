import React from "react";
import { Box } from "@mui/system";
import { Footer, ResponsiveAppBar } from "components/organisms";
import { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "utils/hooks/useAuth";
import { Loader } from "features/loader/Loader";

export function MainLayout() {
    //authorized layout
    const { authenticatedUser } = useAuth();
    const location = useLocation();
    return authenticatedUser || location.pathname === "/" ? (
        <Box sx={{ mb: 25, mt: 8 }} className="main-layout-container">
            <ResponsiveAppBar />
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            <Footer />
        </Box>
    ) : (
        <Navigate to="/auth/login" state={{ from: location.pathname }} />
    );
}
