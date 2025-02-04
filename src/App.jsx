import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import Signin from "./components/Signup";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./store/slices/userSlice";
import AdminProfile from "./SuperAdmin/Scomponents/AdminProfile";
import RegisterAdmins from "./SuperAdmin/Scomponents/RegisterAdmin";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="/register-admins" element={<RegisterAdmins />} />
          <Route path="/admin-profile-page/:id" element={<AdminProfile />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
