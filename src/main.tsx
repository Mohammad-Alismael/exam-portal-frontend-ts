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
let persist = persistStore(store);
store.dispatch((_)=> {
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZV9pZCI6IjMiLCJpYXQiOjE2OTIwMjg2MTgsImV4cCI6MTY5MjAyOTUxOH0.0SepYurL9Vcp7_WlY_F94zGTBMiHDpuNc9x1RKe8-vI
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
