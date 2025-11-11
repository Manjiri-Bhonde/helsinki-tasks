import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from 'react-redux'
import App from "./App"
import counterReducer from "./reducers/counterReducer";

const store = createStore(counterReducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
