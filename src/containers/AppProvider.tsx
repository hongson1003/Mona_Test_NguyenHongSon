import { store } from "@/store";
import theme from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

interface IAppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: IAppProviderProps) => {
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
