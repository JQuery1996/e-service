import { Box } from "@mui/system";
import { Footer, ResponsiveAppBar } from "components/organisms";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  //authorized layout

  return (
    <Box sx={{ mb: 25, mt: 8 }} className="main-layout-container">
      <ResponsiveAppBar />
      <Suspense fallback={<div>Loading... </div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </Box>
  
  );
}
