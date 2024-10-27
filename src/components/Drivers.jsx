import React from "react";
import styles from "./Drivers.module.css";
import { useQueryClient } from "@tanstack/react-query";

const Drivers = (props) => {
  const queryClient = useQueryClient();

  return (
    <>
      <div className={`row ${styles.drivers}`} key={props.key}>
        <div className="col-sm">{props.familyName}</div>
        <div className='col-sm'>{props.dob}</div>
        <div className='col-sm'>{props.nationality}</div>
        <button className='col-sm'>Add</button>
      </div>
    </>
  );
};

export default Drivers;
