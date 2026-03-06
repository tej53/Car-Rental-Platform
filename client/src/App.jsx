import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { useLocation, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";

function App(){
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <>
      {!isOwnerPath && <NavBar setShowLogin={setShowLogin}></NavBar>}

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/carDetails/:id" element={<CarDetails></CarDetails>}></Route>
        <Route path="/cars" element={<Cars></Cars>}></Route>
        <Route path="/my-bookings" element={<MyBookings></MyBookings>}></Route>

        <Route path="/owner" element={<Layout></Layout>}>
          <Route index element={<Dashboard></Dashboard>}></Route>
          <Route path="add-car" element={<AddCar></AddCar>}></Route>
          <Route path="manage-cars" element={<ManageCars></ManageCars>}></Route>
          <Route path="manage-bookings" element={<ManageBookings></ManageBookings>}></Route>
        </Route>
      </Routes>

      

      {!isOwnerPath && <Footer></Footer>}
    </>
  )
}

export default App;