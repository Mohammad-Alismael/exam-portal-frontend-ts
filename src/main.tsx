import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import {coursesApiSlice} from "./features/courses/coursesApiSlice";
let persist = persistStore(store);

// store.dispatch(coursesApiSlice.endpoints.getCourses.initiate())
store.dispatch((_)=> {
    console.log('dam! this is from main.tsx', store.getState().auth)
})
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
