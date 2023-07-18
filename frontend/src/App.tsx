import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginRouterLayout from "./pages/Login";
import RegisterRouterLayout from "./pages/Register";
import ErrorRouterLayout from "./pages/Error";
import HomeRouterLayout from "./pages/Home";
import { useDispatch } from "react-redux";
import { authActions } from "./store/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorRouterLayout />,
    element: <LoginRouterLayout />,
  },
  {
    path: "/register",
    errorElement: <ErrorRouterLayout />,
    element: <RegisterRouterLayout />,
  },
  {
    path: "/home/*",
    element: <HomeRouterLayout />,
  },
]);

export default function App() {
  const dispatch = useDispatch();
  dispatch(authActions.errorAuth());
  return <RouterProvider router={router} />;
}
