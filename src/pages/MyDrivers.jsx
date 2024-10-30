import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import styles from "../components/Drivers.module.css";
import { Link } from "react-router-dom";

const MyDrivers = () => {
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

  const removeDrivers = async (deleteId) => {
    // code to remove drivers

    const res = await fetch(
      "https://api.airtable.com/v0/appucqt9L91D56Qr5/Table%201/" + deleteId,
      {
        method: "DELETE",
        headers: { authorization: "Bearer " + import.meta.env.VITE_TOKEN },
      }
    );
    if (!res.ok) {
      throw new Error("cannot remove driver");
    }
  };

  const queryMyDrivers = useQuery({
    queryKey: ["myDrivers"],
    queryFn: getMyDrivers,
  });

  const mutation = useMutation({
    mutationFn: removeDrivers,
    onSuccess: () => {
      queryClient.invalidateQueries(["myDrivers"]);
    },
  });

   // Image URL generation function
   const getDriverImageUrl = (givenName, familyName) => {
    const driverName = `${givenName}_${familyName}`.replace(/ /g, "_");
    return `https://en.wikipedia.org/wiki/File:${driverName}.jpg`; // Example URL
  };

  // Handle loading and error states
  if (queryMyDrivers.isLoading) {
    return <div>Loading...</div>;
  }

  if (queryMyDrivers.isError) {
    return <div>Error: {queryMyDrivers.error.message}</div>;
  }


  return (
    <div className="container">
      <div className="row">
        <h2>My Drivers</h2>
      </div>
      <br />

      <div className="row">
        <div className="col-md">Given Name</div>
        <div className="col-md">Family Name</div>
        <div className="col-md">Date of Birth</div>
        <div className="col-md">Nationality</div>
        <div className="col-md"></div>
        <div className="col-md"></div>

        {queryMyDrivers.isSuccess &&
          queryMyDrivers.data.map((item) => {
            return (
              <div className={`row ${styles.drivers}`} key={item.id}>
                <div className="col-sm">
                <img
                src={getDriverImageUrl(item.fields.givenName, item.fields.familyName)}
                alt={`${item.fields.givenName} ${item.fields.familyName}`}
                style={{ width: "75px", height: "auto" }}
              />
                </div>
                <div className="col-sm">{item.fields.givenName}</div>
                <div className="col-sm">{item.fields.familyName}</div>
                <div className="col-sm">{item.fields.dateOfBirth}</div>
                <div className="col-sm">{item.fields.nationality}</div>
                <div className="col-sm">
                  {item.fields.url ? (
                    <a href={item.fields.url} target="_blank" rel="noreferrer">
                      Profile
                    </a>
                  ) : (
                    <span>No Profile Link</span>
                  )}
                </div>

                <button
                  type="button"
                  className="col-sm btn btn-primary"
                  onClick={() => {
                    mutation.mutate(item.id);
                  }}
                >
                  Remove {item.fields.url}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyDrivers;

/*

<img
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Alonso-68_%2824710447098%29.jpg/330px-Alonso-68_%2824710447098%29.jpg"
                    }
                    alt="Fernando Alonso"
                    style={{ width: "75px", height: "auto" }}
                  />

                  ====
<div className="col-sm">
                <Link to={item.fields.url}>Profile</Link>
              </div>

      console.log(a[0][0]);
    console.log(a[0][1].fields.driverId);
*/
