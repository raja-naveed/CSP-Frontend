import axios from "axios";
import { useEffect } from "react";
import userIcon from "../assets/images/userIcon.png"
import { BASEURL, admin } from "../constants";
import { message } from "antd";
import { useState } from "react";

const ViewNgoRequests = () => {

  const [ngos, setNgos] = useState([]);
  useEffect(() => {
    getInactiveNgo();
  }, []);

  const getInactiveNgo = async () => {
    try {
      const response = await axios.get(BASEURL + admin.inActiveNgo);
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

  const deleteNgo = async(id) =>{
    try {
      const response = await axios.delete(BASEURL + admin.deleteNgo+ id)
      if(response && response.data){
        message.success("Request Rejected")
        getInactiveNgo();
      }
      else{
        message.error("Error Rejecting request")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateNgo = async(ngo)=>{
    console.log("ngo",ngo)
    try {
      let data = {
        ...ngo,
        isActive : true
      }
      const response = await axios.put(BASEURL + admin.updateNgo ,data);
      if(response && response.data){
        message.success("Ngo Updated");
        getInactiveNgo();
      }
      else{
        message.error("Error Updating Ngo");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/icons/requests-icon.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Requests</h1>
          </div>
        </div>
      </div>

      <div className="container px-md-5">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="bg-light">
              <tr>
                <th className="fw-bold h5 py-3">#</th>
                <th className="fw-bold border-start border-end h5 py-3" style={{
                  minWidth: '200px',
                }}>
                  Name
                </th>
                <th className="fw-bold border-start border-end h5 py-3">
                  Phone
                </th>
                <th className="fw-bold h5 py-3">Address</th>
                <th className="fw-bold h5 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {ngos && ngos.length > 0 && ngos.map((ngo,index) => (
                <tr className="bg-success my-2" key={index + 1}>
                  <td className="h5">{index + 1 }</td>
                  <td className="text-nowrap">
                    <img
                      src={ngo.profileImage ? ngo.profileImage : userIcon}
                      alt="alt-text"
                      width={"30rem"}
                      className="img-fluid"
                    />
                    <span className="h5 ms-2 text-wrap">{ngo.ngoName}</span>
                  </td>
                  <td className="h5 text-nowrap">{ngo.phone}</td>
                  <td className="h5 text-nowrap">{ngo.address}</td>
                  <td className="text-center text-nowrap">
                    <button className="btn btn-sm btn-primary mx-1 text-uppercase" onClick={()=>updateNgo(ngo)}>
                      Approve
                    </button>
                    <button className="btn btn-sm btn-danger mx-1 text-uppercase" onClick={()=>deleteNgo(ngo._id)}>
                      Reject
                    </button>
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

export default ViewNgoRequests;
