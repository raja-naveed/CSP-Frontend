import axios from "axios";
import { BASEURL, reward } from "../constants";
import { useEffect, useState } from "react";
import { message } from "antd";
import auth from "../services/authService";
import userIcon from "../assets/images/userIcon.png";

const Awards = () => {
  const [requests, setRequests] = useState([]);
  const [file , setFile] = useState(null); 
  // const refsArray = new Array(requests.length).fill().map(() => useRef(null));
  const [user, setUser] = useState({});
  useEffect(() => {
    userAuthAndDetails();
  }, [])

  useEffect(() => {
    getRequests();
  }, [user])

  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    setUser(userDetail);
  }

  const getRequests = async () => {
    try {
      let data = { ngoId: user._id }
      const response = await axios.post(BASEURL + reward.certificateRequest, data);
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

  const uploadCertificate = async (rewardId) => {
      try{
        let data = new FormData();
        data.append("rewardId" ,rewardId);
        data.append("certificate", file)                
        const response = await axios.put(BASEURL + reward.uploadCertificate , data)
        if(response && response.data){
          message.success("Uploaded successfully")
          getRequests();
        }
        else{
          message.error("Error")
        }
      }
      catch(error){
        console.log(error);
      }
  }
  const handleChange = (event) =>{
    const certificate = event.target.files[0];
    setFile(certificate);
  }
  const rejectRequest = async(data) =>{
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
              src={require("../assets/images/awards-icon.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Awards</h1>
          </div>
        </div>
      </div>

      <div className="container px-md-5">
        <div className="row bg-white pb-3 rounded-4">
          <div className="col-12 px-0">
            <div className="bg-light p-3 pb-0 rounded-4 mb-3">
              <h2>Volunteer Requests</h2>
            </div>
          </div>
          {requests && requests.length > 0 && requests.map((e, index) => (
            <div className="col-12 px-0" key={index}>
              <div className="bg-success rounded-4 mb-3 pt-2">
                <div className="row align-items-center">
                  <div className="col-md-6 d-flex align-items-center">
                    {/* <img onClick={()=>{refsArray[index].current.click()}} */}
                    <img
                      src={e.volDp ? e.volDp : userIcon}
                      className="img-fluid"
                      style={{ maxWidth: "70px", width: "100%" }}
                      alt="alt-text"
                    />
                    <h3 className="fw-bold ms-2">{e.volName}</h3>
                    <small> ( {e.projectName} )</small>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      {/* <div className="mb-1 text-center">
                        <img
                          src={require("../assets/icons/upload.png")}
                          alt="alt-text"
                          className="img-fluid"
                        />
                      </div> */}
                      <div className="text-center">
                        <form onSubmit={()=>uploadCertificate(e.rewardId)} encType="multipart/form-data">
                          {/* <input type="file" style={{visibility:"hidden"}} ref={refsArray[index]} onChange={handleChange} /> */}
                          <input required type="file" onChange={handleChange} />
                          <button className="btn btn-primary w-50" type="submit">Upload</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={()=>rejectRequest(e)}>Reject</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Awards;
