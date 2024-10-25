import React from "react";
import styles from "./Drivers.module.css";
import { useQueryClient } from "@tanstack/react-query";

const Drivers = (props) => {
  const queryClient = useQueryClient();

  return (
    <>
      <div className={`row ${styles.drivers}`} key={props.key}>
        <div className="col-sm">{props.familyName}</div>
      </div>
    </>
  );
};

export default Drivers;
