import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";

// Mui Theme
let theme = createTheme({
    typography: {
        fontFamily: [
            "Bungee Inline",
        ].join(","),
        footer: {
            fontSize: "0.65rem"
        },
        h1: {
            '@media (max-width:600px)': {
                fontSize: '3rem'
            },
            '@media (max-width:360px)': {
                fontSize: '2.8rem'
            },
        },
    },
    palette: {
        primary: { main: "#ffffff" },
        secondary: { main: "#000000DE" },
        error: { main: "#f83600" },
        warning: { main: "#f83600" }
    },
});

theme = responsiveFontSizes(theme);

export default theme;