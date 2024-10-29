import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import styles from "../components/Drivers.module.css";
import { Link } from "react-router-dom";

const MyDrivers = () => {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState();

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
                <div className="col-sm">{item.fields.givenName}</div>
                <div className="col-sm">{item.fields.familyName}</div>
                <div className="col-sm">{item.fields.dateOfBirth}</div>
                <div className="col-sm">{item.fields.nationality}</div>
                <div className="col-sm">
                  {item.fields.url ? (
                    <a
                      href={item.fields.url}
                      target="_blank"
                      // rel="noopener noreferrer"
                    >
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
                    setDeleteId(item.id);
                    mutation.mutate(item.id);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyDrivers;

/**
<div className="col-sm">
                <Link to={item.fields.url}>Profile</Link>
              </div>

      console.log(a[0][0]);
    console.log(a[0][1].fields.driverId);
*/
