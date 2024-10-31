import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Drivers from "../components/Drivers";

const Main = () => {
  const queryClient = useQueryClient();
  const [selection, setSelection] = useState("all");

  const getData = async () => {
    const res = await fetch("http://ergast.com/api/f1/drivers.json");

    if (!res.ok) {
      throw new Error("getting data error");
    }

    const data = await res.json();
    const a = Object.keys(data).map((key) => data[key]);

    const b = a[0].DriverTable.Drivers;

    return b;
  };

  const query = useQuery({
    queryKey: ["drivers"],
    queryFn: getData,
    enabled: selection === "all",
  });

  const getDataYear = async (year) => {
    const res = await fetch(`http://ergast.com/api/f1/${year}/drivers.json`);

    if (!res.ok) {
      throw new Error("Error fetching driver data");
    }

    const data = await res.json();
    const a = Object.keys(data).map((key) => data[key]);

    const b = a[0].DriverTable.Drivers;

    return b;
  };

  const queryYear = useQuery({
    queryKey: ["driversYear", selection],
    queryFn: () => getDataYear(selection),
    enabled: selection !== "all",
  });

  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <h2>Info on the fastest drivers on the planet!</h2>
        <img
          src="https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/f_auto/q_auto/content/dam/fom-website/manual/Misc/Driver%20Of%20The%20Day/2024/dotd2024new"
          alt="f1 drivers"
        />
      </div>
      <br />

      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-2">
          <span>F1 Season</span>
        </div>
        <select
          id="selection"
          className="col-md-2"
          onChange={handleSelectionChange}
          value={selection}
        >
          <option key="all" id="all" value="all">
            All
          </option>
          <option key="2024" id="2024" value="2024">
            2024
          </option>
          <option key="2023" id="2023" value="2023">
            2023
          </option>
          <option key="2022" id="2022" value="2022">
            2022
          </option>
          <option key="2021" id="2021" value="2021">
            2021
          </option>
          <option key="2020" id="2020" value="2020">
            2020
          </option>
          <option key="2019" id="2019" value="2019">
            2019
          </option>
          <option key="2018" id="2018" value="2018">
            2018
          </option>
        </select>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-md">Given Name</div>
        <div className="col-md">Family Name</div>
        <div className="col-md">Date of Birth</div>
        <div className="col-md">Nationality</div>
        <div className="col-md"></div>
        <div className="col-md"></div>

        {selection === "all" &&
          query.isSuccess &&
          query.data.map((item) => (
            <Drivers
              key={item.driverId}
              id={item.driverId}
              givenName={item.givenName}
              familyName={item.familyName}
              dob={item.dateOfBirth}
              nationality={item.nationality}
              url={item.url}
            />
          ))}

        {selection !== "all" &&
          queryYear.isSuccess &&
          queryYear.data.map((item) => (
            <Drivers
              key={item.driverId}
              id={item.driverId}
              givenName={item.givenName}
              familyName={item.familyName}
              dob={item.dateOfBirth}
              nationality={item.nationality}
              url={item.url}
            />
          ))}
      </div>
    </div>
  );
};

export default Main;

