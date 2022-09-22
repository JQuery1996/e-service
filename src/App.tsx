import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "themes";
import { Box, CssBaseline, Paper } from "@mui/material";
import Routes from "routes";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { store } from "./app/store";
import { Provider } from "react-redux";
// Notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//For Rtl view
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
});

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            {/*For right dirction rtl*/}
            <CacheProvider value={cacheRtl}>
                <CssBaseline />
                <Box dir="rtl">
                    {/*Web routes*/}
                    <Provider store={store}>
                        <Routes />
                    </Provider>
                </Box>
                <ToastContainer rtl />
            </CacheProvider>
        </ThemeProvider>
    );
}

export default App;
