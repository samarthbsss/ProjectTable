import React, { useState, useEffect } from "react";
import { useFetcher, useLocation } from "react-router-dom";
import axios from "axios";
import "../Css/data.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const Data = (props) => {
  const [data, getdata] = useState({});
  const [loading, setLoading] = useState(true);
  const [add, addingitems] = useState(false);
  const [projectdata, setprojectdata] = useState({
    customer: "",
    contactno: "",
    turbineframesr: "",
    steamend: [
      {
        top: {
          ttldesc: "",
          hyd: "",
          date: "",
        },
        bottom: {
          ttldesc: "",
          date: "",
        },
      },
    ],

    exhastendcasing: [
      {
        top: {
          ttldesc: "",
          hyd: "",
          date: "",
        },
        bottom: {
          ttldesc: "",
          date: "",
        },
      },
    ],
    innercasing: [
      {
        top: {
          ttldesc: "",
          hyd: "",
          date: "",
        },
        bottom: {
          ttldesc: "",
          date: "",
        },
      },
    ],
    stop$emergencyvalvebody1: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    stop$emergencyvalvebody2: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    stop$emergencyvalvebody3: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    stop$emergencyvalvebody4: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    nozzlechest: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    throttlevalve1: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    throttlevalve2: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    throttlevalve3: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    throttlevalve4: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    passoutmanifold: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    passinvalvecolumn: {
      ttldesc: "",
      hyd: "",
      date: "",
  },
    passinvalvecolumn1: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    passinvalvecolumn2: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    passinvalvecolumn3: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    passinvalvecolumn4: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    throttlevalvebox: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    power: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    rotor: {
      ttldesc: "",
      hyd: "",
    },
    nozzle: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    blades: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    gearboxbottom: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    controlvalvebody: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    baseplate: {
      ttldesc: "",
      date: "",
    },
    gearbox: {
      ttldesc: "",
      date: "",
    },
    hppedestal: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    lppedestal: {
      ttldesc: "",
      hyd: "",
      date: "",
    },
    guidebladecarrier1: [
      {
        top: {
          ttldesc: "",
          hyd: "",
        },
        bottom: {
          ttldesc: "",
        },
      },
    ],
    guidebladecarrier2: [
      {
        top: {
          ttldesc: "",
        },
        bottom: {
          ttldesc: "",
        },
      },
    ],
    guidebladecarrier3: [
      {
        top: {
          ttldesc: "",
        },
        bottom: {
          ttldesc: "",
        },
      },
    ],
    guidebladecarrier4: [
      {
        top: {
          ttldesc: "",
        },
        bottom: {
          ttldesc: "",
        },
      },
    ],
  });
  const location = useLocation();
  const { item } = location.state;

  useEffect(() => {
    fetchData(item);
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`api/project/${item}`);
      setprojectdata(res.data);
      console.log("fetch successful", res.data);
      setLoading(false);
    } catch (error) {
      console.log("not working", error);
    }
  };

  const handleData = async () => {
    try {
      await axios.post(`api/project/${item}/update`, projectdata);
      fetchData(item);
      // console.log("worked");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataChange =(e,category, data)=>{
    setprojectdata((projectdata )=>({
      ...projectdata,
      [category]:{
        ...projectdata[category],
     
          [data] : e.target.value
       
        
      },
      // ...projectdata.category.slice(1),
    }))
    // console.log(e.target.value ,category ,data);
    console.log(projectdata, "from handle Datachange");

  }
  
  return (
    <>
      <h1 className="heading">This is the data page</h1>
      <div id="buttonbox">
        <button onClick={handleData}>Save</button>
        <button margin="20px" onClick={(e) => addingitems(false)}>
          Edit
        </button>
      </div>
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
              <td>
                <textarea
                  id="steamendcasing"
                  type="text"
                  value={projectdata.steamend[0]?.top?.ttldesc || ""}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      steamend: [
                        {
                          ...projectdata.steamend[0],
                          top: {
                            ...projectdata.steamend[0].top,
                            ttldesc: e.target.value,
                          },
                        },
                        ...projectdata.steamend.slice(1),
                      ],
                    }))
                  }
                />
              </td>
              <td rowSpan={2}>
                <textarea
                  type="text"
                  // value={data.steamend}
                  value={projectdata.steamend[0]?.top?.hyd || ""}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      steamend: [
                        {
                          ...projectdata.steamend[0],
                          top: {
                            ...projectdata.steamend[0].top,
                            hyd: e.target.value,
                          },
                        },
                        ...projectdata.steamend.slice(1),
                      ],
                    }))
                  }
                ></textarea>
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.steamend[0]?.top?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      steamend: [
                        {
                          ...projectdata.steamend[0],
                          top: {
                            ...projectdata.steamend[0].top,
                            date: e.target.value,
                          },
                        },
                        ...projectdata.steamend.slice(1),
                      ],
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td>
                <textarea
                  id="steamendcasing"
                  type="text"
                  value={projectdata.steamend[0]?.bottom?.ttldesc || ""}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      steamend: [
                        {
                          ...projectdata.steamend[0],
                          bottom: {
                            ...projectdata.steamend[0].bottom,
                            ttldesc: e.target.value,
                          },
                        },
                        ...projectdata.steamend.slice(1),
                      ],
                    }))
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.steamend[0]?.bottom?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      steamend: [
                        {
                          ...projectdata.steamend[0],
                          bottom: {
                            ...projectdata.steamend[0].bottom,
                            date: e.target.value,
                          },
                        },
                        ...projectdata.steamend.slice(1),
                      ],
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={2} scope="rowgroup">
                2
              </th>
              <th rowSpan={2} scope="rowgroup">
                Exhast End Casing
              </th>

              <th scope="row">Top</th>
              <td>
                <textarea
                  id="exhastendcasing"
                  type="text"
                  value={projectdata.exhastendcasing[0]?.top?.ttldesc || ""}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      exhastendcasing: [
                        {
                          ...projectdata.exhastendcasing[0],
                          top: {
                            ...projectdata.exhastendcasing[0].top,
                            ttldesc: e.target.value,
                          },
                        },
                        ...projectdata.exhastendcasing.slice(1),
                      ],
                    }))
                  }
                />
              </td>
              <td rowSpan={2}>
                <textarea
                  // id="exhastendcasing"
                  type="text"
                  value={projectdata.exhastendcasing[0]?.top?.hyd || ""}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      exhastendcasing: [
                        {
                          ...projectdata.exhastendcasing[0],
                          top: {
                            ...projectdata.exhastendcasing[0].top,
                            hyd: e.target.value,
                          },
                        },
                        ...projectdata.exhastendcasing.slice(1),
                      ],
                    }))
                  }
                />
              </td>
              <td>
              <input
                  // id="exhastendcasing"
                  type="date"
                  value={
                    projectdata.exhastendcasing[0]?.top?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      exhastendcasing: [
                        {
                          ...projectdata.exhastendcasing[0],
                          top: {
                            ...projectdata.exhastendcasing[0].top,
                            date: e.target.value,
                          },
                        },
                        ...projectdata.exhastendcasing.slice(1),
                      ],
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td>
              <textarea
                  id="exhastendcasing"
                  type="text"
                  value={projectdata.exhastendcasing[0]?.bottom?.ttldesc || ""}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      exhastendcasing: [
                        {
                          ...projectdata.exhastendcasing[0],
                          bottom: {
                            ...projectdata.exhastendcasing[0].bottom,
                            ttldesc: e.target.value,
                          },
                        },
                        ...projectdata.exhastendcasing.slice(1),
                      ],
                    }))
                  }
                />
              </td>
              <td>
              <input
                  // id="exhastendcasing"
                  type="date"
                  value={
                    projectdata.exhastendcasing[0]?.bottom?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      exhastendcasing: [
                        {
                          ...projectdata.exhastendcasing[0],
                          bottom: {
                            ...projectdata.exhastendcasing[0].bottom,
                            date: e.target.value,
                          },
                        },
                        ...projectdata.exhastendcasing.slice(1),
                      ],
                    }))
                  }
                />

              </td>
            </tr>

            <tr>
              <th rowSpan={2} scope="rowgroup">
                3
              </th>
              <th rowSpan={2} scope="rowgroup">
                Inner Casting
              </th>

              <th scope="row">Top</th>
              <td>
              <textarea
                  id="innercasing"
                  type="text"
                  value={projectdata.innercasing[0]?.top?.ttldesc || ""}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      innercasing: [
                        {
                          ...projectdata.innercasing[0],
                          top: {
                            ...projectdata.innercasing[0].top,
                            ttldesc: e.target.value,
                          },
                        },
                        ...projectdata.innercasing.slice(1),
                      ],
                    }))
                  }
                />
              </td>
              <td rowSpan={2}>
              <textarea
                  id="innercasing"
                  type="text"
                  value={projectdata.innercasing[0]?.top?.hyd || ""}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      innercasing: [
                        {
                          ...projectdata.innercasing[0],
                          top: {
                            ...projectdata.innercasing[0].top,
                            hyd: e.target.value,
                          },
                        },
                        ...projectdata.innercasing.slice(1),
                      ],
                    }))
                  }
                />

              </td>
              <td>
              <input
                  type="date"
                  value={
                    projectdata.innercasing[0]?.top?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      innercasing: [
                        {
                          ...projectdata.innercasing[0],
                          top: {
                            ...projectdata.innercasing[0].top,
                            date: e.target.value,
                          },
                        },
                        ...projectdata.innercasing.slice(1),
                      ],
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td>
              <textarea
                  id="innercasing"
                  type="text"
                  value={projectdata.innercasing[0]?.bottom?.ttldesc || ""}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      innercasing: [
                        {
                          ...projectdata.innercasing[0],
                          bottom: {
                            ...projectdata.innercasing[0].bottom,
                            ttldesc: e.target.value,
                          },
                        },
                        ...projectdata.innercasing.slice(1),
                      ],
                    }))
                  }
                />
              </td>

              <td><input
                  type="date"
                  value={
                    projectdata.innercasing[0]?.bottom?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      innercasing: [
                        {
                          ...projectdata.innercasing[0],
                         bottom: {
                            ...projectdata.innercasing[0].bottom,
                            date: e.target.value,
                          },
                        },
                        ...projectdata.innercasing.slice(1),
                      ],
                    }))
                  }
                /></td>
            </tr>
            <tr>
              <th scope="rowgroup">4</th>
              <th colSpan={2} scope="rowgroup">
                Stop & Emergency valve Body -I
              </th>

              <td>
                <textarea
                  id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody1.ttldesc}
                  onChange={(e)=>handleDataChange(e, "stop$emergencyvalvebody1", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody1.hyd}
                  onChange={(e)=>handleDataChange(e, "stop$emergencyvalvebody1", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.stop$emergencyvalvebody1?.date?.split("T")[0]|| ""}
                  onChange={(e)=> handleDataChange(e, "stop$emergencyvalvebody1" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">5</th>
              <th colSpan={2} scope="rowgroup">
                Stop & Emergency valve Body -II
              </th>
              <td>
              <textarea
                  id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody2.ttldesc}
                  onChange={(e)=>handleDataChange(e, "stop$emergencyvalvebody2", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody2.hyd}
                  onChange={(e)=>handleDataChange(e, "stop$emergencyvalvebody2", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.stop$emergencyvalvebody2?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "stop$emergencyvalvebody2" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">6</th>
              <th colSpan={2} scope="rowgroup">
                Stop & Emergency valve Column -I
              </th>
              <td>
              <textarea
                  id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody3.ttldesc}
                  onChange={(e)=>handleDataChange(e, "stop$emergencyvalvebody3", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody3.hyd}
                  onChange={(e)=>handleDataChange(e, "stop$emergencyvalvebody3", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.stop$emergencyvalvebody3?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "stop$emergencyvalvebody3" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">6</th>
              <th colSpan={2} scope="rowgroup">
                Stop & Emergency valve Column -II
              </th>
              <td>
              <textarea
                  id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody4.ttldesc}
                  onChange={(e)=>handleDataChange(e, "stop$emergencyvalvebody4", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody4.hyd}
                  onChange={(e)=>handleDataChange(e, "stop$emergencyvalvebody4", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.stop$emergencyvalvebody4?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "stop$emergencyvalvebody4" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">8</th>
              <th colSpan={2} scope="rowgroup">
                Nozzle Chest
              </th>
              <td>
              <textarea
                  id="nozzlechest"
                  type="text"
                  value={projectdata.nozzlechest.ttldesc}
                  onChange={(e)=>handleDataChange(e, "nozzlechest", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.nozzlechest.hyd}
                  onChange={(e)=>handleDataChange(e, "nozzlechest", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.nozzlechest?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "nozzlechest" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">9</th>
              <th colSpan={2} scope="rowgroup">
                Throttle Valve Column -I
              </th>
              <td>
              <textarea
                  id="throttlevalve1"
                  type="text"
                  value={projectdata.throttlevalve1.ttldesc}
                  onChange={(e)=>handleDataChange(e, "throttlevalve1", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.throttlevalve1.hyd}
                  onChange={(e)=>handleDataChange(e, "throttlevalve1", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.throttlevalve1?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "throttlevalve1" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">10</th>
              <th colSpan={2} scope="rowgroup">
                Throttle Valve Column -II
              </th>

              <td>
              <textarea
                  id="throttlevalve2"
                  type="text"
                  value={projectdata.throttlevalve2.ttldesc}
                  onChange={(e)=>handleDataChange(e, "throttlevalve2", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.throttlevalve2.hyd}
                  onChange={(e)=>handleDataChange(e, "throttlevalve2", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.throttlevalve2?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "throttlevalve2" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">11</th>
              <th colSpan={2} scope="rowgroup">
                Throttle Valve Column -III
              </th>
              <td>
              <textarea
                  id="throttlevalve3"
                  type="text"
                  value={projectdata.throttlevalve3.ttldesc}
                  onChange={(e)=>handleDataChange(e, "throttlevalve3", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.throttlevalve3.hyd}
                  onChange={(e)=>handleDataChange(e, "throttlevalve3", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.throttlevalve3?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "throttlevalve3" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">12</th>
              <th colSpan={2} scope="rowgroup">
                Throttle Valve Column -IV
              </th>
              <td>
              <textarea
                  id="throttlevalve4"
                  type="text"
                  value={projectdata.throttlevalve4.ttldesc}
                  onChange={(e)=>handleDataChange(e, "throttlevalve4", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.throttlevalve4.hyd}
                  onChange={(e)=>handleDataChange(e, "throttlevalve4", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.throttlevalve4?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "throttlevalve4" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">13</th>
              <th colSpan={2} scope="rowgroup">
                Pass Out Manifold
              </th>
                <td>
                <textarea
                    id="passoutmanifold"
                    type="text"
                    value={projectdata.passoutmanifold.ttldesc}
                    onChange={(e)=>handleDataChange(e, "passoutmanifold", "ttldesc")}
                  />
                </td>
                <td>
                <textarea
                    // id="stop&"
                    type="text"
                    value={projectdata.passoutmanifold.hyd}
                    onChange={(e)=>handleDataChange(e, "passoutmanifold", "hyd")}
                  />
                </td>
                <td>
                <input
                    type="date"
                    value={projectdata.passoutmanifold?.date?.split("T")[0] || ""}
                    onChange={(e)=> handleDataChange(e, "passoutmanifold" ,"date")}
                  />
                </td>
            </tr>
            <tr>
              <th scope="rowgroup">14</th>
              <th colSpan={2} scope="rowgroup">
                Pass in valve chest
              </th>
              <td>
              <textarea
                  id="passinvalvecolumn"
                  type="text"
                  value={projectdata.passinvalvecolumn.ttldesc}
                  onChange={(e)=>handleDataChange(e, "passinvalvecolumn", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.passinvalvecolumn.hyd}
                  onChange={(e)=>handleDataChange(e, "passinvalvecolumn", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.passinvalvecolumn?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "passinvalvecolumn" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">15</th>
              <th colSpan={2} scope="rowgroup">
                Pass in valve Column -I 
              </th>
              <td>
              <textarea
                  id="passinvalvecolumn1"
                  type="text"
                  value={projectdata.passinvalvecolumn1.ttldesc}
                  onChange={(e)=>handleDataChange(e, "passinvalvecolumn1", "ttldesc")}
                />
              </td> 
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.passinvalvecolumn1.hyd}
                  onChange={(e)=>handleDataChange(e, "passinvalvecolumn1", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.passinvalvecolumn1?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "passinvalvecolumn1" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">16</th>
              <th colSpan={2} scope="rowgroup">
                Pass in valve Column -II
              </th>
              <td>
              <textarea
                  id="passinvalvecolumn2"
                  type="text"
                  value={projectdata.passinvalvecolumn2.ttldesc}
                  onChange={(e)=>handleDataChange(e, "passinvalvecolumn2", "ttldesc")}
                />
              </td>
              <td>
              <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.passinvalvecolumn2.hyd}
                  onChange={(e)=>handleDataChange(e, "passinvalvecolumn2", "hyd")}
                />
              </td>
              <td>
              <input
                  type="date"
                  value={projectdata.passinvalvecolumn2?.date?.split("T")[0] || ""}
                  onChange={(e)=> handleDataChange(e, "passinvalvecolumn2" ,"date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">17</th>
              <th colSpan={2} scope="rowgroup">
                Pass in valve Column -III
              </th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">18</th>
              <th colSpan={2} scope="rowgroup">
                Pass in valve Column -IV
              </th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">19</th>
              <th colSpan={2} scope="rowgroup">
                Throttle Valve Box
              </th>
              <td></td>
              <td></td>
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
              <th scope="rowgroup">21</th>
              <th colSpan={2} scope="rowgroup">
                Rotor
              </th>
              <td></td>
              <td colSpan={2}></td>
              {/* <td></td> */}
            </tr>
            <tr>
              <th scope="rowgroup">22</th>
              <th colSpan={2} scope="rowgroup">
                Nozzle
              </th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">23</th>
              <th colSpan={2} scope="rowgroup">
                Blades
              </th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">23</th>
              <th colSpan={2} scope="rowgroup">
                Blades
              </th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">24</th>
              <th colSpan={2} scope="rowgroup">
                Gear Box Bottom
              </th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">25</th>
              <th colSpan={2} scope="rowgroup">
                Control Valve Body
              </th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">26</th>
              <th colSpan={2} scope="rowgroup">
                Baseplate
              </th>
              <td colSpan={2}></td>
              {/* <td ></td> */}
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">27</th>
              <th colSpan={2} scope="rowgroup">
                Gearbox
              </th>
              <td colSpan={2}></td>
              {/* <td ></td> */}
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">28</th>
              <th colSpan={2} scope="rowgroup">
                Hp Pedestal
              </th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope="rowgroup">29</th>
              <th colSpan={2} scope="rowgroup">
                Lp Pedestal
              </th>
              <td></td>
              <td></td>
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
