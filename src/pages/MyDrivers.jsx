import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import styles from "../components/Drivers.module.css";
import { Link } from "react-router-dom";

const MyDrivers = (props) => {
  const queryClient = useQueryClient();

  const getMyDrivers = async () => {
    const res = await fetch(
      "https://api.airtable.com/v0/appucqt9L91D56Qr5/Table%201?view=Grid%20view",
      { headers: { authorization: "Bearer " + import.meta.env.VITE_TOKEN } }
    );

    if (!res.ok) {
      throw new Error("getting My Drivers error");
    }

    const data = await res.json();
    const a = Object.keys(data).map((key) => data[key]);
    const b = a[0];

    return b;
  };

  const removeDrivers = () => {
    // code to remove drivers
  };

  const queryMyDrivers = useQuery({
    queryKey: ["myDrivers"],
    queryFn: getMyDrivers,
  });

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

      {queryMyDrivers.isSuccess &&
        queryMyDrivers.data.map((item) => {
          return (
            <div className={`row ${styles.drivers}`} key={item.fields.driverId}>
              <div className="col-sm">{item.fields.givenName}</div>
              <div className="col-sm">{item.fields.familyName}</div>
              <div className="col-sm">{item.fields.dateOfBirth}</div>
              <div className="col-sm">{item.fields.nationality}</div>
              <div className="col-sm">
                <Link to={item.fields.url}>Profile</Link>
              </div>

              <button type="button" className="col-sm btn btn-primary">
                Remove
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default MyDrivers;

/**
<div className={`row ${styles.drivers}`} key={props.key}>
        <div className="col-sm">{props.givenName}</div>
        <div className="col-sm">{props.familyName}</div>
        <div className="col-sm">{props.dob}</div>
        <div className="col-sm">{props.nationality}</div>
        <button type="button" className="col-sm btn btn-primary">
          Remove
        </button>
      </div>

      console.log(a[0][0]);
    console.log(a[0][1].fields.driverId);
*/
