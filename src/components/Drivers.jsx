import React from "react";
import styles from "./Drivers.module.css";
import { useQueryClient } from "@tanstack/react-query";

const Drivers = (props) => {
  const queryClient = useQueryClient();

  return (
    <>
      <div className={`row ${styles.drivers}`} key={props.id}>
        <div className="col-sm">{props.givenName}</div>
        <div className="col-sm">{props.familyName}</div>
        <div className="col-sm">{props.dob}</div>
        <div className="col-sm">{props.nationality}</div>
        <button type="button" className="col-sm btn btn-primary">
          Add
        </button>
      </div>
    </>
  );
};

export default Drivers;
