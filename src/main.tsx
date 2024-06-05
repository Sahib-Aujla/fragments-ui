import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddFragment from "./pages/fragement/AddFragment.tsx";
import DetailFragment from "./pages/fragement/DetailFragment.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App isPassedToWithAuthenticator={true} />,
  },
  {
    path: "/addfragment",
    element: <AddFragment />,
  },
  {
    path: "/details/:id",
    element: <DetailFragment />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
