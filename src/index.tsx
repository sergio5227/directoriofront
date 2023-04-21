import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter  } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from "./store";
import { Provider } from 'react-redux'

const store = configureStore;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* [USO DE HASH ROUTER] */}
    <HashRouter>
      {" "}
      <Provider store={store}>
          <App />
        </Provider>
      {" "}
    </HashRouter>
  </React.StrictMode>
);
reportWebVitals();
