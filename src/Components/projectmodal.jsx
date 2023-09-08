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

        },
       
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
        className="custom-modal"
      >
        <h2 className="modal-title">Modal Form</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="customer">Customer</label>
            <input
              type="text"
              id="customer"
              placeholder="Enter customer name"
              value={newItem.customer}
              onChange={(e) =>
                setNewItem({ ...newItem, customer: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactno">Contract No</label>
            <input
              type="text"
              id="contactno"
              placeholder="Enter contract number"
              value={newItem.contactno}
              onChange={(e) =>
                setNewItem({ ...newItem, contactno: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="turbineframesr">Turbine Frame SR</label>
            <input
              type="text"
              id="turbineframesr"
              placeholder="Enter turbine frame SR"
              value={newItem.turbineframesr}
              onChange={(e) =>
                setNewItem({ ...newItem, turbineframesr: e.target.value })
              }
            />
          </div>
          <div className="form-actions">
            <button className="modal-button submit-button" type="submit">
              Submit
            </button>
            <button className="modal-button close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </Modal>
      );
    };
    
    export default ProjectModalForm;