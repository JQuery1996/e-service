import { createTheme, experimental_sx as sx } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    background: {
      paper: "#FFF",
      default: "#f8f8f8",
    },
    primary: {
      main: "#02676b",
    },
  },

  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1320 },
  },
  typography: {
    fontFamily: "'Tajawal', sans-serif",
    h4: {
      fontSize: "2rem",
    },
  },

  components: {
    //App bar override
    MuiAppBar: {
      styleOverrides: {
        root: sx({
          boxShadow: 0,
          fontSize: 16,
          backgroundColor: "background.default",
        }),
      },
    },
    //Button override
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: sx({
          borderRadius: 56,
          textTransform: "capitalize",
        }),
      },
      variants: [
        {
          props: {
            "aria-label": "search",
          },
          style: sx({
            width: 90,
            borderRadius: "4px",
          }),
        },
        {
          props: {
            variant: "text",
            color: "primary",
          },
          style: sx({
            fontSize: "1rem",
            fontWeight: "bold",
          }),
        },
        {
          props: {
            variant: "text",
          },
          style: sx({
            p: 0,
            ":hover": {
              backgroundColor: "transparent",
            },
            ":focus": {
              backgroundColor: "transparent",
            },
          }),
        },
      ],
    },

    //InputBase override
    MuiInputBase: {
      variants: [
        {
          props: {
            type: "search",
          },
          style: sx({
            mr: 0,
            bgcolor: "grey.300",
            borderRadius: 1,
            px: 1,
            width: "100%",
          }),
        },
      ],
    },
    //Avatar override
    MuiAvatar: {
      styleOverrides: {
        root: sx({
          width: 25,
          height: 25,
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: sx({
          borderRadius: 6,
        }),
      },
    },
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: sx({
    //       width: 15,
    //       height: 15,
    //       color: "grey.500"
    //     }),
    //   }
    // },
    MuiCard: {
      styleOverrides: {
        root: sx({
          boxShadow: "0px 3px 50px #0000000D",
          borderRadius: "5px",
          backgroundColor: "white",
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: sx({
          px: 3,
          py: 2,
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: sx({
          height: 40,
          width: 40,
        }),
      },
    },
  },
});
