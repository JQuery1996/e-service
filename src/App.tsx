import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from 'themes';
import { CssBaseline } from '@mui/material';
import Routes from 'routes';
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from '@emotion/react';

//For Rtl view
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

function App() {
  return (
    < ThemeProvider theme={lightTheme} >
      {/*For right dirction rtl*/}
      <CacheProvider value={cacheRtl}>
        <CssBaseline />
        <div dir='rtl'>
          {/*Web routes*/}
          <Routes />
        </div>
      </CacheProvider>
    </ThemeProvider >
  );
}

export default App;
