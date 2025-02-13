import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f4f6f8",
          fontFamily: "Roboto, sans-serif",
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export default theme;
