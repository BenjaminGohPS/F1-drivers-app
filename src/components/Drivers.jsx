import React, { useState } from "react";
import styles from "./Drivers.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateModal from "./UpdateModal";

const Drivers = (props) => {
  const queryClient = useQueryClient();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const addDrivers = async () => {
    console.log(props.givenName);
    const res = await fetch(
      "https://api.airtable.com/v0/appucqt9L91D56Qr5/Table%201",
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + import.meta.env.VITE_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            driverId: props.id,
            url: props.url,
            givenName: props.givenName,
            familyName: props.familyName,
            dateOfBirth: props.dob,
            nationality: props.nationality,
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error("cannot add to My Drivers");
    }
  };

  const mutation = useMutation({
    mutationFn: addDrivers,
    onSuccess: () => {
      queryClient.invalidateQueries(["myDrivers"]);
      setShowUpdateModal(true);
    },
  });

  return (
    <>
      <div className={`row ${styles.drivers}`} key={props.id}>
        <div className="col-sm">{props.givenName}</div>
        <div className="col-sm">{props.familyName}</div>
        <div className="col-sm">{props.dob}</div>
        <div className="col-sm">{props.nationality}</div>

        {showUpdateModal && (
          <UpdateModal id={props.id} setShowUpdateModal={setShowUpdateModal} />
        )}
        <button
          type="button"
          className="col-sm btn btn-primary"
          onClick={mutation.mutate}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default Drivers;
