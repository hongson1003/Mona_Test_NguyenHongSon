import { AppProvider, CreateOrder } from "./containers";

function App() {
  return (
    <AppProvider>
      <CreateOrder />
    </AppProvider>
  );
}

export default App;
