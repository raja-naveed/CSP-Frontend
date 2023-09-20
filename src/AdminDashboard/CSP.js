import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { BASEURL, reward } from "../constants";
import { message } from "antd";

const CSP = () => {

  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    getRequests();
  }, [])
  const getRequests = async () => {
    try {
      const response = await axios.get(BASEURL + reward.pointsRequest);
      if (response && response.data) {
        setRequests(response.data);
      }
      else {
        message.info("No requests Found")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const rejectRequest = async(data) =>{
    if(requests.length === 1){
      setRequests(null);
    }
    let body = {...data};
    const response = await axios.post(BASEURL + reward.rejectRequest , body);
    if(response && response.data){
      message.success("Request Rejected");
      getRequests();
    }
    else{
      message.error("Error Rejecting Request")
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

      <div className="container p-md-5">
        <div className="bg-white rounded-4" style={{ minHeight: "30rem" }}>
          <div className="bg-gray rounded-4 p-2 mb-3">
            <h1>CSP Point Requests</h1>
          </div>
          <div className="container">

          {requests && requests.length > 0 && requests.map((e, index) => (
            <div key={index} className="row bg-info p-md-3 p-2 rounded-4 align-items-center mb-4">
              <div className="col-md-1">
                <div className="mb-md-0 mb-3 text-md-start text-center">
                  <img
                    src={require("../assets/icons/ngo-network.png")}
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-7">
                <div className="mb-md-0 mb-3">
                  <h3 className="text-md-start text-center mb-0">
                    {e.volName}
                  </h3>
                  <small className="text-light">
                    Completed {e.projectName} Project Organize by {e.ngoName}
                  </small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div onClick={()=>navigate("/admin-dashboard/grant-points",{state:{id : e.rewardId}})}
                        className="btn btn-primary w-100"
                      >
                        Grant
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div onClick={()=>rejectRequest(e)}
                        className="btn btn-primary w-100"
                      >
                        Reject
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CSP;
