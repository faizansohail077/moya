import { Provider } from "react-redux";
import AppRouter from "./config/router";
import store from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
