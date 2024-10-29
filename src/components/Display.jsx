import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import About from "../pages/About";
import MyDrivers from "../pages/MyDrivers";
import NotFound from "../pages/NotFound";
import Main from "../pages/Main";

const Display = () => {
  const queryClient = useQueryClient();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <h1>F1 Drivers Info</h1>
        </div>
        <div className="col-md-1"></div>
      </div>

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          {/* <NavBar /> */}
        </div>
        <div className="col-md-1"></div>
      </div>

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/mydrivers" element={<MyDrivers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default Display;
