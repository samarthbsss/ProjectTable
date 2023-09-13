import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../Css/tabledata.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import { ToastExample } from "./toast";
import { useToast } from '@chakra-ui/react'

export const Data = (props) => {
  const [edit, setedit] = useState(true);
  const toast = useToast()
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`api/project/${item}`);
      setprojectdata(res.data);
      // setLoading(false);
    } catch (error) {
      console.log("not working", error);
    }
  };

  const handleData = async () => {
    try {
      await axios.post(`api/project/${item}/update`, projectdata);
      fetchData(item);
      setedit(true)
      toast({
        title: 'Table Saved!',
        description: "You can export the tabel now",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataChange = (e, category, data) => {
    setprojectdata((projectdata) => ({
      ...projectdata,
      [category]: {
        ...projectdata[category],

        [data]: e.target.value,
      },
    }));
  };

  const handleHeadingChange = (e, category) => {
    setprojectdata((projectdata) => ({
      ...projectdata,
      [category]: e.target.value
    }))
  }

  const handleguideblade = (e, category, key, data) => {
    setprojectdata((projectdata) => ({
      ...projectdata,
      [category]: [
        {
          ...projectdata[category][0],
          [key]: {
            [data]: e.target.value,
          },
        },
        ...projectdata[category].slice(1),
      ],
    }));
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(10);

    const title =
      `Customer: ${projectdata.customer} `;

    const headers = [
      [
        "Sl no",
        { content: "Item Desc", colSpan: 2 },
        "TTl desc",
        "HYD test",
        "Date",
      ],
    ];
    const items = [
      [
        { rowSpan: 2, content: "1" },
        { content: "Steam End Casing", rowSpan: 2 },
        "Top",
        `${projectdata.steamend[0].top.ttldesc}`,

        { rowSpan: 2, content: `${projectdata.steamend[0].top.hyd}` },
        `${projectdata.steamend[0]?.top?.date?.split("T")[0] || ""}`,
      ],
      [
        "Bottom",
        `${projectdata.steamend[0].bottom.ttldesc}`,
        `${projectdata.steamend[0]?.bottom?.date?.split("T")[0] || ""}`,
      ],
      [
        { rowSpan: 2, content: "2" },
        { content: "Exhast End Casing", rowSpan: 2 },
        "Top",
        `${projectdata.exhastendcasing[0].top.ttldesc}`,
        { rowSpan: 2, content: `${projectdata.exhastendcasing[0].top.hyd}` },
        `${projectdata.exhastendcasing[0]?.top?.date?.split("T")[0] || ""}`,
      ],
      [
        "Bottom",
        `${projectdata.exhastendcasing[0].bottom.ttldesc}`,
        `${projectdata.exhastendcasing[0]?.bottom?.date?.split("T")[0] || ""}`,
      ],
      [
        { rowSpan: 2, content: "3" },
        { content: "Inner casting", rowSpan: 2 },
        "Top",
        `${projectdata.innercasing[0].top.ttldesc}`,
        { rowSpan: 2, content: `${projectdata.innercasing[0].top.hyd}` },
        `${projectdata.innercasing[0]?.top?.date?.split("T")[0] || ""}`,
      ],
      [
        "Bottom",
        `${projectdata.innercasing[0].bottom.ttldesc}`,
        `${projectdata.innercasing[0]?.bottom?.date?.split("T")[0] || ""}`,
      ],
      [
        "4",
        { content: "Stop & Emergency valve Body -I", colSpan: 2 },
        `${projectdata.stop$emergencyvalvebody1.ttldesc}`,
        `${projectdata.stop$emergencyvalvebody1.hyd}`,
        `${projectdata.stop$emergencyvalvebody1?.date?.split("T")[0] || ""}`,
      ],
      [
        "5",
        { content: "Stop & Emergency valve Body -II", colSpan: 2 },
        `${projectdata.stop$emergencyvalvebody2.ttldesc}`,
        `${projectdata.stop$emergencyvalvebody2.hyd}`,
        `${projectdata.stop$emergencyvalvebody2?.date?.split("T")[0] || ""}`,
      ],
      [
        "6",
        { content: "Stop & Emergency valve Column -I", colSpan: 2 },
        `${projectdata.stop$emergencyvalvebody3.ttldesc}`,
        `${projectdata.stop$emergencyvalvebody3.hyd}`,
        `${projectdata.stop$emergencyvalvebody3?.date?.split("T")[0] || ""}`,
      ],
      [
        "7",
        { content: "Stop & Emergency valve Column -II", colSpan: 2 },
        `${projectdata.stop$emergencyvalvebody4.ttldesc}`,
        `${projectdata.stop$emergencyvalvebody4.hyd}`,
        `${projectdata.stop$emergencyvalvebody4?.date?.split("T")[0] || ""}`,
      ],
      [
        "8",
        { content: "Nozzle Chest", colSpan: 2 },
        `${projectdata.nozzlechest.ttldesc}`,
        `${projectdata.nozzlechest.hyd}`,
        `${projectdata.nozzlechest.date?.split("T")[0] || ""}`,
      ],
      [
        "9",
        { content: "Throttle Valve Column -I", colSpan: 2 },
        `${projectdata.throttlevalve1.ttldesc}`,
        `${projectdata.throttlevalve1.hyd}`,
        `${projectdata.throttlevalve1.date?.split("T")[0] || ""}`,
      ],
      [
        "10",
        { content: "Throttle Valve Column -II", colSpan: 2 },
        `${projectdata.throttlevalve2.ttldesc}`,
        `${projectdata.throttlevalve2.hyd}`,
        `${projectdata.throttlevalve2.date?.split("T")[0] || ""}`,
      ],
      [
        "11",
        { content: "Throttle Valve Column -III", colSpan: 2 },
        `${projectdata.throttlevalve3.ttldesc}`,
        `${projectdata.throttlevalve3.hyd}`,
        `${projectdata.throttlevalve3.date?.split("T")[0] || ""}`,
      ],
      [
        "12",
        { content: "Throttle Valve Column -IV", colSpan: 2 },
        `${projectdata.throttlevalve4.ttldesc}`,
        `${projectdata.throttlevalve4.hyd}`,
        `${projectdata.throttlevalve4.date?.split("T")[0] || ""}`,
      ],
      [
        "13",
        { content: "Pass Out Manifold", colSpan: 2 },
        `${projectdata.passoutmanifold.ttldesc}`,
        `${projectdata.passoutmanifold.hyd}`,
        `${projectdata.passoutmanifold.date?.split("T")[0] || ""}`,
      ],
      [
        "14",
        { content: "Pass in valve chest", colSpan: 2 },
        `${projectdata.passinvalvecolumn.ttldesc}`,
        `${projectdata.passinvalvecolumn.hyd}`,
        `${projectdata.passinvalvecolumn.date?.split("T")[0] || ""}`,
      ],
      [
        "15",
        { content: "Pass in valve Column -I", colSpan: 2 },
        `${projectdata.passinvalvecolumn1.ttldesc}`,
        `${projectdata.passinvalvecolumn1.hyd}`,
        `${projectdata.passinvalvecolumn1.date?.split("T")[0] || ""}`,
      ],
      [
        "16",
        { content: "Pass in valve Column -II", colSpan: 2 },
        `${projectdata.passinvalvecolumn2.ttldesc}`,
        `${projectdata.passinvalvecolumn2.hyd}`,
        `${projectdata.passinvalvecolumn2.date?.split("T")[0] || ""}`,
      ],
      [
        "17",
        { content: "Pass in valve Column -III", colSpan: 2 },
        `${projectdata.passinvalvecolumn3.ttldesc}`,
        `${projectdata.passinvalvecolumn3.hyd}`,
        `${projectdata.passinvalvecolumn3.date?.split("T")[0] || ""}`,
      ],
      [
        "18",
        { content: "Pass in valve Column -IV", colSpan: 2 },
        `${projectdata.passinvalvecolumn4.ttldesc}`,
        `${projectdata.passinvalvecolumn4.hyd}`,
        `${projectdata.passinvalvecolumn4.date?.split("T")[0] || ""}`,
      ],
      [
        "19",
        { content: "Throttle Valve Box", colSpan: 2 },
        `${projectdata.throttlevalvebox.ttldesc}`,
        `${projectdata.throttlevalvebox.hyd}`,
        `${projectdata.throttlevalvebox.date?.split("T")[0] || ""}`,
      ],
      [
        { content: "20", rowSpan: 2 },
        { content: "Power/Relay Cylinder", rowSpan: 2 },
        "Hp",
        { content: `${projectdata.power.ttldesc}`, rowSpan: 2 },
        { content: `${projectdata.power.hyd}`, rowSpan: 2 },
        { content: `${projectdata.power.date?.split("T")[0] || ""}`, rowSpan: 2 },
      ],
      [
        "Grid value /LP"
      ],
      [
        "21",
        { content: "Rotor", colSpan: 2 },
        `${projectdata.rotor.ttldesc}`,
        { content: `${projectdata.rotor.hyd}`, colSpan: 2 }

      ],
      [
        "22",
        { content: "Nozzle", colSpan: 2 },
        `${projectdata.nozzle.ttldesc}`,
        `${projectdata.nozzle.hyd}`,
        `${projectdata.nozzle.date?.split("T")[0] || ""}`,
      ],
      [
        "23",
        { content: "Blades", colSpan: 2 },
        `${projectdata.blades.ttldesc}`,
        `${projectdata.blades.hyd}`,
        `${projectdata.blades.date?.split("T")[0] || ""}`,
      ],
      [
        "24",
        { content: "Gear Box Bottom", colSpan: 2 },
        `${projectdata.gearboxbottom.ttldesc}`,
        `${projectdata.gearboxbottom.hyd}`,
        `${projectdata.gearboxbottom.date?.split("T")[0] || ""}`,
      ],
      [
        "25",
        { content: "Control Valve Body", colSpan: 2 },
        `${projectdata.controlvalvebody.ttldesc}`,
        `${projectdata.controlvalvebody.hyd}`,
        `${projectdata.controlvalvebody.date?.split("T")[0] || ""}`,
      ],
      [
        "26",
        { content: "Baseplate", colSpan: 2 },
        { content: `${projectdata.baseplate.ttldesc}`, colSpan: 2 },
        `${projectdata.baseplate.date?.split("T")[0] || ""}`,

      ],
      [
        "27",
        { content: "Gearbox", colSpan: 2 },
        { content: `${projectdata.gearbox.ttldesc}`, colSpan: 2 },
        `${projectdata.baseplate.date?.split("T")[0] || ""}`,

      ],
      [
        "28",
        { content: "Hp Pedestal", colSpan: 2 },
        `${projectdata.hppedestal.ttldesc}`,
        `${projectdata.hppedestal.hyd}`,
        `${projectdata.hppedestal.date?.split("T")[0] || ""}`,
      ],
      [
        "29",
        { content: "Lp Pedestal", colSpan: 2 },
        `${projectdata.lppedestal.ttldesc}`,
        `${projectdata.lppedestal.hyd}`,
        `${projectdata.lppedestal.date?.split("T")[0] || ""}`,
      ],
      [
        { content: "30", rowSpan: 2 },
        { content: "Guide Blade Carrier-I", rowSpan: 2 },
        "Top",
        `${projectdata.guidebladecarrier1[0].top.ttldesc}`,
        { styles: { textalign: "center" }, colSpan: 2, rowSpan: 8, content: `${projectdata.guidebladecarrier1[0].top.hyd}` }
      ],
      [
        "Bottom",
        { content: `${projectdata.guidebladecarrier1[0].bottom.ttldesc}` },
      ],
      [
        { content: "31", rowSpan: 2 },
        { content: "Guide Blade Carrier-II", rowSpan: 2 },
        "Top",
        `${projectdata.guidebladecarrier2[0].top.ttldesc}`,

      ],
      [
        "Bottom",
        `${projectdata.guidebladecarrier2[0].bottom.ttldesc}`,
      ],
      [
        { content: "32", rowSpan: 2 },
        { content: "Guide Blade Carrier-III", rowSpan: 2 },
        "Top",
        `${projectdata.guidebladecarrier3[0].top.ttldesc}`,

      ],
      [
        "Bottom",
        `${projectdata.guidebladecarrier3[0].bottom.ttldesc}`,
      ],
      [
        { content: "33", rowSpan: 2 },
        { content: "Guide Blade Carrier-IV", rowSpan: 2 },
        "Top",
        `${projectdata.guidebladecarrier4[0].top.ttldesc}`,

      ],
      [
        "Bottom",
        `${projectdata.guidebladecarrier4[0].bottom.ttldesc}`,
      ]



    ];
    let content = {
      head: headers,
      body: items,
      theme: "grid",
      headStyles: { lineWidth: 1.5 },
      bodyStyles: { lineWidth: 1.5 },
      // fontSize:1,
    };
    doc.text(title, marginLeft, 20);
    doc.autoTable(content);
    doc.save(`${projectdata.customer}.pdf`);
  };

  return (
    <>
      {/* <h1 className="heading">This is the data page</h1> */}
      <div className="button-container">
        <button className="export-button" onClick={exportPDF}>Export PDF</button>
        <button className="save-button" onClick={handleData}>Save</button>
        <button className="save-button" onClick={() => setedit(!edit)}>Edit</button>
      </div>
      <div id="content">
        <table id="maintable">
          <tbody>
            <tr>
              <th colSpan={6}>
                <h1>Document Required for Quality Dossier From NDT</h1>
              </th>
            </tr>
            <tr>
              <th colSpan={2}>
                Customer :
              </th>
              {
                edit ? (
                  <td colSpan={4}>
                    {projectdata.customer}

                  </td>
                ) : (
                  <td colSpan={4}>

                    <textarea
                      type="text"
                      value={projectdata.customer}
                      onChange={(e) => handleHeadingChange(e, "customer")}
                    />
                  </td>
                )
              }
            </tr>
            <tr>
              <th colSpan={2}>Contract No :</th>
              {
                edit ? (
                  <td colSpan={2}>
                    {projectdata.contactno}

                  </td>
                ) : (
                  <td colSpan={2}>

                    <textarea
                      type="text"
                      value={projectdata.contactno}
                      onChange={(e) => handleHeadingChange(e, "contactno")}
                    />
                  </td>
                )
              }

              <th>TurbineFrame SrNo :</th>
           
              {
                edit ? (
                  <td colSpan={2}>{projectdata.turbineframesr}</td>
                ) : (
                  <td colSpan={2}>
                    <textarea
                      type="text"
                      value={projectdata.turbineframesr}
                      onChange={(e) => handleHeadingChange(e, "turbineframesr")}
                    />
                  </td>
                )
              }
            </tr>
            <tr>
              <th id="sl-no">Sl No:</th>
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
                    projectdata.exhastendcasing[0]?.top?.date?.split("T")[0] ||
                    ""
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
                    projectdata.exhastendcasing[0]?.bottom?.date?.split(
                      "T"
                    )[0] || ""
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

              <td>
                <input
                  type="date"
                  value={
                    projectdata.innercasing[0]?.bottom?.date?.split("T")[0] ||
                    ""
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
                />
              </td>
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
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody1", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody1.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody1", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.stop$emergencyvalvebody1?.date?.split("T")[0] ||
                    ""
                  }
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody1", "date")
                  }
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
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody2", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody2.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody2", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.stop$emergencyvalvebody2?.date?.split("T")[0] ||
                    ""
                  }
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody2", "date")
                  }
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
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody3", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody3.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody3", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.stop$emergencyvalvebody3?.date?.split("T")[0] ||
                    ""
                  }
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody3", "date")
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">7</th>
              <th colSpan={2} scope="rowgroup">
                Stop & Emergency valve Column -II
              </th>
              <td>
                <textarea
                  id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody4.ttldesc}
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody4", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.stop$emergencyvalvebody4.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody4", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.stop$emergencyvalvebody4?.date?.split("T")[0] ||
                    ""
                  }
                  onChange={(e) =>
                    handleDataChange(e, "stop$emergencyvalvebody4", "date")
                  }
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
                  onChange={(e) =>
                    handleDataChange(e, "nozzlechest", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.nozzlechest.hyd}
                  onChange={(e) => handleDataChange(e, "nozzlechest", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.nozzlechest?.date?.split("T")[0] || ""}
                  onChange={(e) => handleDataChange(e, "nozzlechest", "date")}
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
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalve1", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.throttlevalve1.hyd}
                  onChange={(e) => handleDataChange(e, "throttlevalve1", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.throttlevalve1?.date?.split("T")[0] || ""}
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalve1", "date")
                  }
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
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalve2", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.throttlevalve2.hyd}
                  onChange={(e) => handleDataChange(e, "throttlevalve2", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.throttlevalve2?.date?.split("T")[0] || ""}
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalve2", "date")
                  }
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
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalve3", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.throttlevalve3.hyd}
                  onChange={(e) => handleDataChange(e, "throttlevalve3", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.throttlevalve3?.date?.split("T")[0] || ""}
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalve3", "date")
                  }
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
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalve4", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.throttlevalve4.hyd}
                  onChange={(e) => handleDataChange(e, "throttlevalve4", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.throttlevalve4?.date?.split("T")[0] || ""}
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalve4", "date")
                  }
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
                  onChange={(e) =>
                    handleDataChange(e, "passoutmanifold", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.passoutmanifold.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "passoutmanifold", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.passoutmanifold?.date?.split("T")[0] || ""}
                  onChange={(e) =>
                    handleDataChange(e, "passoutmanifold", "date")
                  }
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
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.passinvalvecolumn.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.passinvalvecolumn?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn", "date")
                  }
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
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn1", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.passinvalvecolumn1.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn1", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.passinvalvecolumn1?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn1", "date")
                  }
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
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn2", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.passinvalvecolumn2.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn2", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.passinvalvecolumn2?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn2", "date")
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">17</th>
              <th colSpan={2} scope="rowgroup">
                Pass in valve Column -III
              </th>
              <td>
                <textarea
                  id="passinvalvecolumn3"
                  type="text"
                  value={projectdata.passinvalvecolumn3.ttldesc}
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn3", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.passinvalvecolumn3.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn3", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.passinvalvecolumn3?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn3", "date")
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">18</th>
              <th colSpan={2} scope="rowgroup">
                Pass in valve Column -IV
              </th>
              <td>
                <textarea
                  id="passinvalvecolumn4"
                  type="text"
                  value={projectdata.passinvalvecolumn4.ttldesc}
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn4", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.passinvalvecolumn4.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn4", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.passinvalvecolumn4?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    handleDataChange(e, "passinvalvecolumn4", "date")
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">19</th>
              <th colSpan={2} scope="rowgroup">
                Throttle Valve Box
              </th>
              <td>
                <textarea
                  id="throttlevalvebox"
                  type="text"
                  value={projectdata.throttlevalvebox.ttldesc}
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalvebox", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.throttlevalvebox.hyd}
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalvebox", "hyd")
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={
                    projectdata.throttlevalvebox?.date?.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    handleDataChange(e, "throttlevalvebox", "date")
                  }
                />
              </td>
            </tr>

            <tr>
              <th rowSpan={2} scope="rowgroup">
                20
              </th>
              <th rowSpan={2} scope="rowgroup">
                Power/Relay Cylinder
              </th>

              <th scope="row">Hp</th>
              <td rowSpan={2}>
                <textarea
                  id="power"
                  type="text"
                  value={projectdata.power.ttldesc}
                  onChange={(e) => handleDataChange(e, "power", "ttldesc")}
                />
              </td>
              <td rowSpan={2}>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.power.hyd}
                  onChange={(e) => handleDataChange(e, "power", "hyd")}
                />
              </td>
              <td rowSpan={2}>
                <input
                  type="date"
                  value={projectdata.power?.date?.split("T")[0] || ""}
                  onChange={(e) => handleDataChange(e, "power", "date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Grid value /LP</th>
            </tr>
            <tr>
              <th scope="rowgroup">21</th>
              <th colSpan={2} scope="rowgroup">
                Rotor
              </th>

              <td>
                <textarea
                  id="rotor"
                  type="text"
                  value={projectdata.rotor.ttldesc}
                  onChange={(e) => handleDataChange(e, "rotor", "ttldesc")}
                />
              </td>
              <td colSpan={2}>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.rotor.hyd}
                  onChange={(e) => handleDataChange(e, "rotor", "hyd")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">22</th>
              <th colSpan={2} scope="rowgroup">
                Nozzle
              </th>
              <td>
                <textarea
                  id="nozzle"
                  type="text"
                  value={projectdata.nozzle.ttldesc}
                  onChange={(e) => handleDataChange(e, "nozzle", "ttldesc")}
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.nozzle.hyd}
                  onChange={(e) => handleDataChange(e, "nozzle", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.nozzle?.date?.split("T")[0] || ""}
                  onChange={(e) => handleDataChange(e, "nozzle", "date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">23</th>
              <th colSpan={2} scope="rowgroup">
                Blades
              </th>
              <td>
                <textarea
                  id="blades"
                  type="text"
                  value={projectdata.blades.ttldesc}
                  onChange={(e) => handleDataChange(e, "blades", "ttldesc")}
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.blades.hyd}
                  onChange={(e) => handleDataChange(e, "blades", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.blades?.date?.split("T")[0] || ""}
                  onChange={(e) => handleDataChange(e, "blades", "date")}
                />
              </td>
            </tr>

            <tr>
              <th scope="rowgroup">24</th>
              <th colSpan={2} scope="rowgroup">
                Gear Box Bottom
              </th>
              <td>
                <textarea
                  id="gearboxbottom"
                  type="text"
                  value={projectdata.gearboxbottom.ttldesc}
                  onChange={(e) =>
                    handleDataChange(e, "gearboxbottom", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.gearboxbottom.hyd}
                  onChange={(e) => handleDataChange(e, "gearboxbottom", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.gearboxbottom?.date?.split("T")[0] || ""}
                  onChange={(e) => handleDataChange(e, "gearboxbottom", "date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">25</th>
              <th colSpan={2} scope="rowgroup">
                Control Valve Body
              </th>
              <td>
                <textarea
                  id="gearboxbottom"
                  type="text"
                  value={projectdata.controlvalvebody.ttldesc}
                  onChange={(e) =>
                    handleDataChange(e, "controlvalvebody", "ttldesc")
                  }
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.controlvalvebody.hyd}
                  onChange={(e) => handleDataChange(e, "controlvalvebody", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.controlvalvebody?.date?.split("T")[0] || ""}
                  onChange={(e) => handleDataChange(e, "controlvalvebody", "date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">26</th>
              <th colSpan={2} scope="rowgroup">
                Baseplate
              </th>
              <td colSpan={2}>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.baseplate.ttldesc}
                  onChange={(e) => handleDataChange(e, "baseplate", "ttldesc")}
                />
              </td>

              <td>
                <input
                  type="date"
                  value={projectdata.baseplate?.date?.split("T")[0] || ""}
                  onChange={(e) => handleDataChange(e, "baseplate", "date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">27</th>
              <th colSpan={2} scope="rowgroup">
                Gearbox
              </th>
              <td colSpan={2}>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.gearbox.ttldesc}
                  onChange={(e) => handleDataChange(e, "gearbox", "ttldesc")}
                />
              </td>

              <td>
                <input
                  type="date"
                  value={projectdata.gearbox?.date?.split("T")[0] || ""}
                  onChange={(e) => handleDataChange(e, "gearbox", "date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">28</th>
              <th colSpan={2} scope="rowgroup">
                Hp Pedestal
              </th>
              <td>
                <textarea
                  id="hppedestal"
                  type="text"
                  value={projectdata.hppedestal.ttldesc}
                  onChange={(e) => handleDataChange(e, "hppedestal", "ttldesc")}
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.hppedestal.hyd}
                  onChange={(e) => handleDataChange(e, "hppedestal", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.hppedestal?.date?.split("T")[0] || ""}
                  onChange={(e) => handleDataChange(e, "hppedestal", "date")}
                />
              </td>
            </tr>
            <tr>
              <th scope="rowgroup">29</th>
              <th colSpan={2} scope="rowgroup">
                Lp Pedestal
              </th>
              <td>
                <textarea
                  id="lppedestal"
                  type="text"
                  value={projectdata.lppedestal.ttldesc}
                  onChange={(e) => handleDataChange(e, "lppedestal", "ttldesc")}
                />
              </td>
              <td>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.lppedestal.hyd}
                  onChange={(e) => handleDataChange(e, "lppedestal", "hyd")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={projectdata.lppedestal?.date?.split("T")[0] || ""}
                  onChange={(e) => handleDataChange(e, "lppedestal", "date")}
                />
              </td>
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
              <td>
                <textarea
                  id="guideblade1"
                  type="text"
                  value={projectdata.guidebladecarrier1[0].top.ttldesc}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      guidebladecarrier1: [
                        {
                          ...projectdata.guidebladecarrier1[0],
                          top: {
                            ...projectdata.guidebladecarrier1[0].top,
                            ttldesc: e.target.value,
                          },
                        },
                        ...projectdata.guidebladecarrier1.slice(1),
                      ],
                    }))
                  }
                />
              </td>
              <td colSpan={6} rowSpan={8}>
                <textarea
                  // id="stop&"
                  type="text"
                  value={projectdata.guidebladecarrier1[0]?.top?.hyd || "NA"}
                  onChange={(e) =>
                    setprojectdata((projectdata) => ({
                      ...projectdata,
                      guidebladecarrier1: [
                        {
                          ...projectdata.guidebladecarrier1[0],
                          top: {
                            ...projectdata.guidebladecarrier1[0].top,
                            hyd: e.target.value,
                          },
                        },
                        ...projectdata.guidebladecarrier1.slice(1),
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
                  id="guideblade1"
                  type="text"
                  value={projectdata.guidebladecarrier1[0].bottom.ttldesc}
                  onChange={(e) =>
                    handleguideblade(
                      e,
                      "guidebladecarrier1",
                      "bottom",
                      "ttldesc"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={2} scope="rowgroup">
                31
              </th>
              <th rowSpan={2} scope="rowgroup">
                Guide Blade Carrier - II
              </th>

              <th scope="row">Top</th>
              <td>
                <textarea
                  id="guideblade1"
                  type="text"
                  value={projectdata.guidebladecarrier2[0].top.ttldesc}
                  onChange={(e) =>
                    handleguideblade(e, "guidebladecarrier2", "top", "ttldesc")
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td>
                {" "}
                <textarea
                  id="guideblade1"
                  type="text"
                  value={projectdata.guidebladecarrier2[0].bottom.ttldesc}
                  onChange={(e) =>
                    handleguideblade(
                      e,
                      "guidebladecarrier2",
                      "bottom",
                      "ttldesc"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={2} scope="rowgroup">
                32
              </th>
              <th rowSpan={2} scope="rowgroup">
                Guide Blade Carrier - III
              </th>

              <th scope="row">Top</th>
              <td>
                <textarea
                  id="guideblade1"
                  type="text"
                  value={projectdata.guidebladecarrier3[0].top.ttldesc}
                  onChange={(e) =>
                    handleguideblade(e, "guidebladecarrier3", "top", "ttldesc")
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td>
                {" "}
                <textarea
                  id="guideblade1"
                  type="text"
                  value={projectdata.guidebladecarrier3[0].bottom.ttldesc}
                  onChange={(e) =>
                    handleguideblade(
                      e,
                      "guidebladecarrier3",
                      "bottom",
                      "ttldesc"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={2} scope="rowgroup">
                33
              </th>
              <th rowSpan={2} scope="rowgroup">
                Guide Blade Carrier - IV
              </th>

              <th scope="row">Top</th>
              <td>
                <textarea
                  id="guideblade1"
                  type="text"
                  value={projectdata.guidebladecarrier4[0].top.ttldesc}
                  onChange={(e) =>
                    handleguideblade(e, "guidebladecarrier4", "top", "ttldesc")
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Bottom</th>
              <td>
                {" "}
                <textarea
                  id="guideblade1"
                  type="text"
                  value={projectdata.guidebladecarrier4[0].bottom.ttldesc}
                  onChange={(e) =>
                    handleguideblade(
                      e,
                      "guidebladecarrier4",
                      "bottom",
                      "ttldesc"
                    )
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
