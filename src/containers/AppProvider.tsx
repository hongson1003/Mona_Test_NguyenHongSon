import { store } from "@/store";
import theme from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
