import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import styles from "../components/Drivers.module.css";

const MyDrivers = (props) => {
  const queryClient = useQueryClient();

  return (
    <div className="container">
      <div className="row">
        <h2>My Drivers</h2>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <p>CONTENT HERE</p>
        </div>
        <div className="col-md-1"></div>
      </div>

      <div className={`row ${styles.drivers}`} key={props.key}>
        <div className="col-sm">{props.givenName}</div>
        <div className="col-sm">{props.familyName}</div>
        <div className="col-sm">{props.dob}</div>
        <div className="col-sm">{props.nationality}</div>
        <button type="button" className="col-sm btn btn-primary">
          Remove
        </button>
      </div>
    </div>
  );
};

export default MyDrivers;
