import { store } from "@/store";
import theme from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

interface IAppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: IAppProviderProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
