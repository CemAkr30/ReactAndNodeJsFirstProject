import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import YourProfileRouterLayout from "./YourProfile";
import DashboardRouterLayout from "./Dashboard";
import Footer from "../components/Footer";
import Home from "../components/Home";
import AboutRouterLayout from "./About";
import ConcatRouterLayout from "./Concat";

export default function HomeRouterLayout() {
  const isAuth = useSelector((state: any) => state.auth.isAuthanticated);
  const dispatch = useDispatch();

  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout: any = null;

    const token = localStorage.getItem("token");
    if (!isAuth && token == undefined) {
      setAlert(true);
      timeout = setTimeout(() => {
        setAlert(false);
        navigate("/");
      }, 2500);
    }

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <>
      {alert && <Alert message={"Go to Home"} backColor={"red"} show={alert} />}
      {!alert && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<AboutRouterLayout />} />
            <Route path="contact" element={<ConcatRouterLayout />} />
            <Route path="yourProfile" element={<YourProfileRouterLayout />} />
            <Route path="dashboard" element={<DashboardRouterLayout />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}
