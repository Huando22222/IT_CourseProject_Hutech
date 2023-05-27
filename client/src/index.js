import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import SideNavBar from "./SideNavBar/SideNavBar";

import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ChakraProvider>
  //   <App />
  // </ChakraProvider>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <>
    <App />
  </>
);

reportWebVitals();
