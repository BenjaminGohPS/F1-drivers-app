import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Drivers from "../components/Drivers";

const Main = () => {
  const queryClient = useQueryClient();

  const getData = async () => {
    const res = await fetch("http://ergast.com/api/f1/drivers.json");

    if (!res.ok) {
      throw new Error("getting data error");
    }

    const data = await res.json();
    const a = Object.keys(data).map((key) => data[key]);
    // a is an array of KVP. so need to do .map?

    // b onwards need to .map, then extract and repeat.
    // const b = Object.keys(a).map((key) => a[key]);
    // const c = Object.keys(b).map((key) => b[key]);
    // const d = Object.keys(c).map((key) => c[key]);

    // console.log(dataReceived);
    // console.log(dataReceived[0]);
    // console.log(b);

    // console.log(a[0]);

    // this is the data I need!
    // console.log(a[0].DriverTable.Drivers[16].driverId); // alonso

    // console.log(a[0]);
    // console.log(a[0].DriverTable.Drivers);
    const b = a[0].DriverTable.Drivers;

    return b;

    // console.log(a[0].DriverTable.Drivers.length); // 30
    //   const for_loop = [];
    //   for (i = 0; i < a[0].DriverTable.Drivers.length; i++) {
    //     for_loop.push(<li>{a[0].DriverTable.Drivers[i].driverId}</li>);
    //   }
    //   getData();
    //   return (
    //     <div>
    //       <center>
    //         <h1>Hello Ninja!</h1>
    //       </center>
    //       {for_loop}
    //     </div>
    //   );
  };

  const query = useQuery({
    queryKey: ["drivers"],
    queryFn: getData,
  });

  return (
    <div className="container">
      <div className="row">
        <h2>Info on the fastest drivers on the planet!</h2>
      </div>
      <br />

      <div className="row">
        
            <div className="col-md">Family Name</div>
            <div className="col-md">Date of Birth</div>
            <div className="col-md">Nationality</div>
         

          {query.isSuccess &&
            query.data.map((item) => {
              return (
                <Drivers
                  key={item.driverId}
                  id={item.driverId}
                  familyName={item.familyName}
                  dob={item.dateOfBirth}
                  nationality={item.nationality}
                />
              );
            })}
       
      </div>
    </div>
  );
};

export default Main;
