import React, { useState } from "react";
import styles from "./Drivers.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UpdateModal from "./UpdateModal";

const Drivers = (props) => {
  const queryClient = useQueryClient();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchDriverImage = async (givenName, familyName) => {
    const formattedName = `${givenName}_${familyName}`.replace(/ /g, "_");
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${formattedName}&prop=pageimages&format=json&origin=*`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    const pageId = Object.keys(data.query.pages)[0];

    return data.query.pages[pageId].thumbnail
      ? data.query.pages[pageId].thumbnail.source
      : null;
  };

  const fetchDriverExists = async (driverId) => {
    // code to check if drivers are already added to airtable-My Drivers

    const res = await fetch(
      `https://api.airtable.com/v0/appucqt9L91D56Qr5/Table%201?filterByFormula={driverId}='${driverId}'`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + import.meta.env.VITE_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Error fetching driver data");
    }

    const data = await res.json();
    return data.records.length > 0;
  };

  const { data: isDriverAdded } = useQuery({
    queryKey: ["checkDriver", props.id],
    queryFn: () => {
      if (!props.id) {
        return false;
      }
      return fetchDriverExists(props.id);
    },
  });

  const addDrivers = async () => {
    const imageUrl = await fetchDriverImage(props.givenName, props.familyName);

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
            imageUrl: imageUrl,
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
      {showUpdateModal && (
        <UpdateModal id={props.id} setShowUpdateModal={setShowUpdateModal} />
      )}

      <div className={`row ${styles.drivers}`} key={props.id}>
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

        {!isDriverAdded && (
          <button type="button" className="col-sm" onClick={mutation.mutate}>
            Add
          </button>
        )}
        {isDriverAdded && <div className="col-sm">Added</div>}
      </div>
    </>
  );
};

export default Drivers;
