import React from "react";
//import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";
// dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import { getPosts } from "./actions/post.actions";

//STYLES
import "./styles/index.css";
import "./styles/buttons.css";

import "./styles/authPage.css";

import "./styles/home-header.css";
import "./styles/post.css";
import "./styles/commentPost.css";


const middleware = [thunk]
const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(...middleware))
);

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root")); //StrictMode est un outil pour détecter les problèmes potentiels d’une application.

root.render(

      <Provider store={store}>
        <App />
      </Provider>

);
