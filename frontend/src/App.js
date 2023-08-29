import React, { Fragment } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Hero from "./Layout/Hero";
import Items from "./Items/Items";
import EditItem from "./Items/EditItemForm";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import AddItemForm from "./Items/AddItemForm";

const App = () => {
  let location = useLocation();
  return (
    <div className="App bg-gray-900">
      <Fragment>
        <Header />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/items"
            element={
              <ProtectedRoutes location={location}>
                <Items />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/items/:itemId"
            element={
              <ProtectedRoutes location={location}>
                <EditItem />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/items/addItems"
            element={
              <ProtectedRoutes location={location}>
                <AddItemForm />
              </ProtectedRoutes>
            }
          />
        </Routes>

        <Footer />
      </Fragment>
    </div>
  );
};

export default App;
