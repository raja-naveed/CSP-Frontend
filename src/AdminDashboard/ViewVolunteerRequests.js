import { useEffect } from "react";
import { useState } from "react";
import { BASEURL, admin } from "../constants";
import { message } from "antd";
import axios from "axios";
import userIcon from "../assets/images/userIcon.png"

const ViewVolunteerRequests = () => {

  const [volunteer, setVolunteer] = useState([]);
  useEffect(() => {
    getInactiveVolunteer();
  }, []);

  const getInactiveVolunteer = async () => {
    try {
      const response = await axios.get(BASEURL + admin.inActiveNgoVolunteer);
      if (response && response.data) {
        setVolunteer(response.data);
      }
      else {
        message.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteVolunteer = async(id) =>{
    try {
      const response = await axios.delete(BASEURL + admin.deleteVolunteer+ id)
      if(response && response.data){
        message.success("Request Rejected")
        getInactiveVolunteer();
      }
      else{
        message.error("Error Rejecting request")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateVolunteer = async(vol)=>{
    try {
      let data = {
        ...vol,
        isActive : true
      }
      const response = await axios.put(BASEURL + admin.updateVolunteer ,data);
      if(response && response.data){
        message.success("Volunteer Updated");
        getInactiveVolunteer();
      }
      else{
        message.error("Error Updating Volunteer");
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
                <th className="fw-bold h5 py-3" style={{
                  minWidth: '250px',
                }}>Address</th>
                <th className="fw-bold h5 py-3 text-center text-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
            {volunteer && volunteer.length > 0 && volunteer.map((vol,index) => (
                <tr className="bg-success my-2">
                  <td className="h5">{index + 1 }</td>
                  <td className="text-nowrap">
                    <img
                      src={vol.profileImage ? vol.profileImage : userIcon}
                      alt="alt-text"
                      width={"30rem"}
                      className="img-fluid"
                    />
                    <span className="h5 ms-2 text-wrap">{vol.fullname}</span>
                  </td>
                  <td className="h5 text-nowrap">{vol.phone}</td>
                  <td className="h5 text-wrap">{vol.address}</td>
                  <td className="text-center text-nowrap">
                    <button className="btn btn-sm mx-1 btn-primary text-uppercase" onClick={()=>updateVolunteer(vol)}>
                      Approve
                    </button>
                    <button className="btn btn-sm mx-1 btn-danger text-uppercase" onClick={()=>deleteVolunteer(vol._id)}>
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

export default ViewVolunteerRequests;
