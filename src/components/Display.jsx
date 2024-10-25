import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import NavBar from "./NavBar";

const Display = () => {
  const queryClient = useQueryClient();

  return (
    <div className="container">
        <div className="row">
        <div className="col-md-12">
          <h1>F1 Drivers Info</h1>
        </div>
      </div>
      <div className="row">
        <NavBar />
      </div>
      
    </div>
  );
};

export default Display;
