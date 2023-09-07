import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
// import { fetchProject } from "../Redux/action";
import { addproject, fetchProject } from "../Redux/action";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const ProjectModalForm = ({ isOpen, closeModal }) => {
    const [newItem, setNewItem] = useState({
      customer: "",
      contactno: "",
     turbineframesr: "",
     steamend:[ 
      {
        top: {
          ttldesc: '',
          hyd: '',
          date: '',
        },
        bottom: {
          ttldesc: "",
          date: "",
        },
      }],
      exhastendcasing: [{
        top: {
            ttldesc: "",
            hyd: "",
            date: ""
        },
        bottom: {
            ttldesc: "",
            date: ""
        }
    }],
    innercasing: [{
        top: {
            ttldesc: "",
            hyd: "",
            date: ""
        },
        bottom: {
            ttldesc: "",
            date: ""
        }
    }],
    stop$emergencyvalvebody1: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    stop$emergencyvalvebody2: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    stop$emergencyvalvebody3: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    stop$emergencyvalvebody4: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    nozzlechest: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    throttlevalve1: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    throttlevalve2: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    throttlevalve3: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    throttlevalve4: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    passoutmanifold: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    passinvalvecolumn: {
      ttldesc: "",
      hyd: "",
      date: "",
  },
    passinvalvecolumn1: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    passinvalvecolumn2: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    passinvalvecolumn3: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    passinvalvecolumn4: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    throttlevalvebox: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    power: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    rotor: {
        ttldesc: "",
        hyd: "",
    },
    nozzle: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    blades: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    gearboxbottom: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    controlvalvebody: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    baseplate: {
        ttldesc: "",
        date: ""
    },
    gearbox: {
        ttldesc: "",
        date: ""
    },
    hppedestal: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    lppedestal: {
        ttldesc: "",
        hyd: "",
        date: ""
    },
    guidebladecarrier1: [{
        top: {
            ttldesc: "",
            hyd: ""
        },
        bottom: {
            ttldesc: "",

        }
    }],
    guidebladecarrier2: [{
        top: {
            ttldesc: "",

        },
        bottom: {
            ttldesc: "",

        }
    }],
    guidebladecarrier3: [{
        top: {
            ttldesc: "",

        },
        bottom: {
            ttldesc: "",

        }
    }],
    guidebladecarrier4: [{
        top: {
            ttldesc: "",

        },
        bottom: {
            ttldesc: "",

        }
    }],
    
    });
  
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newItem);
        dispatch(addproject(newItem));
        dispatch(fetchProject());
        // dispatch(addData(newItem));
        // dispatch(fetchData());
        closeModal();
        setNewItem({
          customer: "",
          // contactno: "",
         turbineframesr: "",
         
        });
      };
    
      return (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Modal Form"
        >
          <h2>Modal Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label> customer</label>
              <input
                type="text"
                placeholder="customer"
                value={newItem.customer}
                onChange={(e) =>
                  setNewItem({ ...newItem, customer: e.target.value })
                }
              />
            </div>
            <div>
              <label>contactno</label>
              <input
                type="text"
                placeholder="contactno"
                value={newItem.contactno}
                onChange={(e) =>
                  setNewItem({ ...newItem, contactno: e.target.value })
                }
              />
            </div>
            <div>
              <label> turbineframesr</label>
              <input 
                placeholder=" turbineframesrt"
                value={newItem.turbineframesr}
                onChange={(e) =>
                  setNewItem({ ...newItem,turbineframesr: e.target.value })
                }
              />
            </div>
            <div>
              {/* <label>DATE</label>
              <input
                type="date"
                placeholder="date"
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
              /> */}
            </div>
            <button className="modal-button" type="submit">
              Submit
            </button>
          </form>
          <button className="modal-button" onClick={closeModal}>
            Close
          </button>
        </Modal>
      );
    };
    
    export default ProjectModalForm;