import ReactDOM from "react-dom";
import {BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';

import store from './store/store';
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement
);
