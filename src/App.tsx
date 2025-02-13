import { CssBaseline, ThemeProvider } from "@mui/material";
import { CreateOrder } from "./containers";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CreateOrder />
    </ThemeProvider>
  );
}

export default App;
