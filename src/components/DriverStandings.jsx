import React from "react";
import styles from "./Drivers.module.css";

const DriverStandings = (props) => {
  return (
    <>
      <br />
      <div className={`row ${styles.drivers}`} key={props.idx}>
        <div className="col-sm">{props.position}</div>
        <div className="col-sm">{props.points}</div>
        <div className="col-sm">{props.wins}</div>
        <div className="col-sm">{props.givenName}</div>
        <div className="col-sm">{props.familyName}</div>
        <div className="col-sm">{props.dob}</div>
        <div className="col-sm">{props.nationality}</div>
        <div className="col-sm">
          {props.url ? (
            <a href={props.url} target="_blank" rel="noreferrer">
              Profile
            </a>
          ) : (
            <span>No Profile Link</span>
          )}
        </div>
        <br />
      </div>
    </>
  );
};

export default DriverStandings;
