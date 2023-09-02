import React, { useState, useEffect } from "react";
import { useFetcher, useLocation } from "react-router-dom";
import axios from "axios";
import "../Css/data.css"

export const Data = (props) => {
  const [projectdata, setprojectdata] = useState({});
  const location = useLocation();
  // const getData =()=>{

  // }
  const { item } = location.state;
  const { from } = location.state;
  // console.log(item , from);
  // console.log(props.location);

  useEffect(() => {
    fetchData(item);
  }, {});

  const fetchData = async () => {
    try {
      const res = await axios.get(`api/project/&{item}`);
      setprojectdata(res.data);
      console.log("fetch successful");
      console.log(projectdata);
    } catch (error) {
      console.log("not working", error);
    }
  };
  console.log(projectdata);

  return (
    <>
      <h1 className="heading">This is the data page</h1>
      <div id="content">
        <table id="maintable">
          <tbody>
         
            <tr>
              <th colSpan="6">
                <h1>Document Required for Quality Dossier From Ndt</h1>
              </th>
            </tr>
        
            <tr>
              <td>
                <h1>Customer :</h1>
              </td>
              <td colSpan={5}>{projectdata.customer}</td>
            </tr>
            <tr>
              <td>Contant No:</td>
              <td>{projectdata.contactno}</td>
              <td>TurbineFrame SrNo :</td>
              <td colSpan={3}>{projectdata.turbineframesr}</td>
            </tr>
            <tr>
              <th>Sl no</th>
              <th colSpan={2}>Item desc</th>
              <th>TTl desc</th>
              <th>HYD test</th>
              <th>Date</th>
            </tr>
            <tr>
              <th rowSpan={2} scope="rowgroup">
                1
              </th>
              <th rowSpan={2} scope="rowgroup">
                Steam End Casing
              </th>

              <th scope="row">Top</th>
              <td></td>
              <td rowSpan={2}></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th rowSpan={2} scope="rowgroup">
                2
              </th>
              <th rowSpan={2} scope="rowgroup">
                Exhast End Casing
              </th>

              <th scope="row">Top</th>
              <td></td>
              <td rowSpan={2}></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <th rowSpan={2} scope="rowgroup">
                3
              </th>
              <th rowSpan={2} scope="rowgroup">
                Inner Casting
              </th>

              <th scope="row">Top</th>
              <td></td>
              <td rowSpan={2}></td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td></td>
             
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">4</th>
              <th colSpan={2} scope="rowgroup">
                Stop & Emergency valve Body -I
              </th>

              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">5</th>
              <th colSpan={2} scope="rowgroup">
                Stop & Emergency valve Body -II
              </th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
                6
              </th>
              <th  colSpan={2}scope="rowgroup">
                Stop & Emergency valve Column -I
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
                6
              </th>
              <th  colSpan={2}scope="rowgroup">
                Stop & Emergency valve Column -II
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
                8
              </th>
              <th  colSpan={2}scope="rowgroup">
               Nozzle Chest
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              9
              </th>
              <th  colSpan={2}scope="rowgroup">
             Throttle Valve Column -I
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              10
              </th>
              <th  colSpan={2}scope="rowgroup">
             Throttle Valve Column -II
              </th>

              {/* <th scope="row">Top</th> */}
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              11
              </th>
              <th  colSpan={2}scope="rowgroup">
             Throttle Valve Column -III
              </th>

              {/* <th scope="row">Top</th> */}
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              12
              </th>
              <th  colSpan={2}scope="rowgroup">
             Throttle Valve Column -IV
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              13
              </th>
              <th  colSpan={2}scope="rowgroup">
            Pass Out Manifold
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              14
              </th>
              <th  colSpan={2}scope="rowgroup">
             Pass in valve chest
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              15
              </th>
              <th  colSpan={2}scope="rowgroup">
             Pass in valve Column -I
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              16
              </th>
              <th  colSpan={2}scope="rowgroup">
             Pass in valve Column -II
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              17
              </th>
              <th  colSpan={2}scope="rowgroup">
             Pass in valve Column -III
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              18
              </th>
              <th  colSpan={2}scope="rowgroup">
             Pass in valve Column -IV
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
              19
              </th>
              <th  colSpan={2}scope="rowgroup">
             Throttle Valve Box
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>

            <tr>
              <th rowSpan={2} scope="rowgroup">
                20
              </th>
              <th rowSpan={2} scope="rowgroup">
                Power/Relay Cylinder
              </th>

              <th scope="row">Hp</th>
              <td rowSpan={2}></td>
              <td rowSpan={2}></td>
              <td rowSpan={2}></td>
            </tr>
            <tr>
              <th scope="row">Grid value /LP</th>
             
            </tr>
            <tr>
              <th  scope="rowgroup">
             21
              </th>
              <th  colSpan={2}scope="rowgroup">
             Rotor
              </th>
              <td></td>
              <td colSpan={2}></td>
              {/* <td></td> */}
            </tr>
            <tr>
              <th  scope="rowgroup">
             22
              </th>
              <th  colSpan={2}scope="rowgroup">
             Nozzle
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
             23
              </th>
              <th  colSpan={2}scope="rowgroup">
            Blades
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
             23
              </th>
              <th  colSpan={2}scope="rowgroup">
            Blades
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
             24
              </th>
              <th  colSpan={2}scope="rowgroup">
            Gear Box Bottom
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
             25
              </th>
              <th  colSpan={2}scope="rowgroup">
            Control Valve Body
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
             26
              </th>
              <th  colSpan={2}scope="rowgroup">
           Baseplate
              </th>
              <td colSpan={2}></td>
              {/* <td ></td> */}
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
             27
              </th>
              <th  colSpan={2}scope="rowgroup">
           Gearbox
              </th>
              <td colSpan={2}></td>
              {/* <td ></td> */}
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
             28
              </th>
              <th  colSpan={2}scope="rowgroup">
            Hp Pedestal
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
            <tr>
              <th  scope="rowgroup">
             29
              </th>
              <th  colSpan={2}scope="rowgroup">
           Lp Pedestal
              </th>
              <td></td>
              <td ></td>
              <td></td>
            </tr>
{/* here */}
            <tr>
              <th rowSpan={2} scope="rowgroup">
                30
              </th>
              <th rowSpan={2} scope="rowgroup">
                Guide Blade Carrier - I
              </th>

              <th scope="row">Top</th>
              <td></td>
              <td colSpan={6} rowSpan={8}></td>
              {/* <td colSpan={9}></td> */}
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td></td>
              {/* <td colSpan={6} rowSpan={7}></td> */}
            </tr>
            <tr>
              <th rowSpan={2} scope="rowgroup">
                31
              </th>
              <th rowSpan={2} scope="rowgroup">
                Guide Blade Carrier - II
              </th>

              <th scope="row">Top</th>
              <td></td>
              
             
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td></td>
             
            </tr>
            <tr>
              <th rowSpan={2} scope="rowgroup">
                32
              </th>
              <th rowSpan={2} scope="rowgroup">
                Guide Blade Carrier - III
              </th>

              <th scope="row">Top</th>
              <td></td>
              
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td></td>
             
            </tr>
            <tr>
              <th rowSpan={2} scope="rowgroup">
                33
              </th>
              <th rowSpan={2} scope="rowgroup">
                Guide Blade Carrier - IV
              </th>

              <th scope="row">Top</th>
              <td></td>
             
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td></td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
