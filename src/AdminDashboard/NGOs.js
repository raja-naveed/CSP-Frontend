import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { BASEURL, admin } from "../constants";
import axios from "axios";
import { message } from "antd";
import { useEffect } from "react";
import userIcon from "../assets/images/userIcon.png"
import { useRef } from "react";
const NGOs = () => {

  const [ngos, setNgos] = useState([]);
  const navigate = useNavigate();
  const linkRef = useRef(null);
  useEffect(() => {
    getActiveNgo();
  }, []);

  const getActiveNgo = async () => {
    try {
      const response = await axios.get(BASEURL + admin.activeNgos);
      if (response && response.data) {
        setNgos(response.data);
      }
      else {
        message.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const viewCertificate = (url) =>{
    // linkRef.current.click();
    return(
      <a href={url} target="_blank"  ref={linkRef} style={{ display: 'none' }}/> 
    )
  }
  
  async function handleSelectChange(event, id) {
    if (event.target.value === "Disable") {
      try {
        let data = {_id : id , isActive : false}
        const response = await axios.put(BASEURL + admin.disableUser  , data );
        if (response && response.data) {
          message.success("User Updated");
          getActiveNgo();
        }
        else {
          message.error("Error Updating");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/icons/ngo-network.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">NGOs</h1>
          </div>
        </div>
      </div>

      <div className="container px-md-5">
        <div className="table-responsive">
          <table className="table table-borderless">
            <thead className="bg-light">
              <tr>
                <th className="fw-bold h5 py-3 text-nowrap">#</th>
                <th
                  className="fw-bold border-start border-end h5 py-3 text-nowrap"
                  style={{ minWidth: "200px" }}
                >
                  NGO Name
                </th>
                <th className="fw-bold border-start border-end h5 py-3">
                  Contact No.
                </th>
                <th
                  className="fw-bold h5 py-3 text-nowrap"
                  style={{ minWidth: "200px" }}
                >
                  Address
                </th>
                <th className="fw-bold h5 py-3 text-nowrap">Projects</th>
                <th className="fw-bold h5 py-3 text-nowrap">NGO Profile</th>
                <th className="fw-bold h5 py-3 text-nowrap">NGO Certificate</th>
                <th className="fw-bold h5 py-3 text-nowrap">NGO Status</th>
              </tr>
            </thead>
            <tbody>
            {ngos && ngos.length > 0 && ngos.map((ngo,index) => (
              <tr className="bg-success my-2">
                <td className="h5">{index + 1}</td>
                <td className="text-nowrap">
                  <img
                    src={ngo.profileImage ? ngo.profileImage : userIcon}
                    width={"30rem"}
                    alt="alt-text"
                    className="img-fluid"
                  />
                  <span className="h5 ms-2 text-wrap">{ngo.ngoName}</span>
                </td>
                <td className="h5 text-nowrap">{ngo.phone}</td>
                <td className="h5 text-nowrap">{ngo.address}</td>
                <td>
                  <div onClick={()=>navigate("/admin-dashboard/ngo-projects" , {state : {id : ngo._id}})}
                    className="btn btn-sm btn-danger text-uppercase"
                  >
                    See All
                  </div>
                </td>
                <td>
                  <div
                    onClick={()=>navigate("/admin-dashboard/ngo-profile",{state:{id:ngo._id}})}
                    className="btn btn-sm btn-danger text-uppercase"
                  >
                    View Profile
                  </div>
                </td>
                <td>
                <button
                      onClick={() => viewCertificate(ngo.certificate)}
                      className="btn btn-sm btn-danger text-uppercase"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal-${ngo._id}`} // Unique id for each modal
                    >
                      View Certificate
                </button>

{/* Modal content */}
      <div
        className="modal fade"
        id={`exampleModal-${ngo._id}`} // Unique id for each modal
        tabIndex="-1"
        aria-labelledby={`exampleModalLabel-${ngo._id}`} // Unique id for each modal
        aria-hidden="true"
      >
   <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <img
                src={ngo.certificate}
                className="border-0 img-fluid w-100"
                alt=""
              />
        </div>
      </div>
    </div>
  </div>

  
                </td>
                <td>
                    <select name="" id="" className="form-select bg-info" onChange={(event) => handleSelectChange(event, ngo._id)}>
                      <option value="Enabled" defaultChecked>
                        Enabled
                      </option>
                      <option value="Disable">Disabled</option>
                    </select>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NGOs;
