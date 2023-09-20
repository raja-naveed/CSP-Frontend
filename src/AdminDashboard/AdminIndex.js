import { Link, useNavigate } from "react-router-dom";
import auth from "../services/authService";
import userIcon from "../assets/images/userIcon.png";
import { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { BASEURL, admin, logout, projectApis } from "../constants";

const AdminIndex = () => {
  const [activeProjects, setActiveProjects] = useState([]);
  const [latestRequests, setLatestRequests] = useState([]);
  const [count, setCount] = useState({ volunteers: 0, ngos: 0, project: 0 })
  const [user, setUser] = useState({});
  const navigate = useNavigate(null);
  useEffect(() => {
    userAuthAndDetails();
    getCount();
    getLatestRequests();
  }, []);

  useEffect(() => {
    getProjects();;
  }, [user]);
  const getCount = async () => {
    try {
      const response = await axios.get(BASEURL + admin.count);
      console.log(response);
      if (response && response.data) {
        setCount(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getLatestRequests = async () => {
    try {
      const response = await axios.get(BASEURL + admin.latestRequests);
      if (response && response.data) {
        setLatestRequests(response.data.data);
      }
      else {
        message.info('No latest Request Found')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    setUser(userDetail)
  }

  const handleClick = () =>{
    logout();
  }

  const getProjects = async () => {
    try {
      let url = BASEURL + projectApis.getAll
      let response = await axios.get(url);
      if (response && response.data) {
        setActiveProjects(response.data)
      }
      else {
        message.error("Error occured.");
        message.info("Try again later");
      }
    }
    catch (error) {
     // message.info("No Active Projects Found")
    }
  };
  const deleteRequest = async (params) => {
    if(latestRequests.length === 1){
      setLatestRequests(null);
    }
    try {
      let param = params;
      let request = { url: null, id: null };
      if (param.ngoId) {
        request.id = param.ngoId;
        request.url = BASEURL + admin.deleteNgo
      }
      if (param.volId) {
        request.id = param.volId;
        request.url = BASEURL + admin.deleteVolunteer
      }
      if (param.projectId) {
        request.id = param.projectId;
        request.url = BASEURL + projectApis.deleteProject
      }
      const response = await axios.delete(request.url + request.id)
      if (response && response.data) {
        message.success("Request Rejected successfully")
        getLatestRequests();
        getCount();
      }
      else {
        message.error("Error Rejecting request")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateRequest = async (params) => {
    if(latestRequests.length === 1){
      setLatestRequests(null);
    }
    try {
      let param = params;
      let data = {};
      let url = null;

      if (param.ngoId) {
        data = {
          _id: param.ngoId,
          isActive: true
        }
        url = BASEURL + admin.updateNgo
      }

      if (param.volId) {
        data = {
          _id: param.volId,
          isActive: true
        }
        url = BASEURL + admin.updateVolunteer
      }
      if (param.projectId) {
        data = {
          _id: param.projectId,
          isActive: true
        }
        url = BASEURL + projectApis.updateProject
      }
      const response = await axios.put(url, data);
      if (response && response.data) {
        message.success("Updated succesfully");
        getLatestRequests();
        getCount();
      }
      else {
        message.error("Error Updating");
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (user) {
    return (
      <>
        <div className="container pt-md-3">
          <div className="row justify-content-between align-items-center mb-md-5 mb-3">
            <div className="col-md-6 col-10">
              <div className="input-group">
                <span className="input-group-text bg-white rounded-start-pill border-0">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 rounded-end-pill"
                  placeholder="Search Project..."
                />
              </div>
            </div>
            <div className="col-md-6 col-2">
              <div className="row g-0">
                <div className="col-md-11">
                  <div className="text-end d-md-block d-none">
                    <p className="fw-bold text-white mb-0">{user.email}</p>
                  </div>
                </div>
                <div className="col-md-1">
                  <div className="dropdown text-md-end">
                    <button
                      className="btn p-0"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={userIcon}
                        alt="alt-text"
                        className="img-fluid"
                      />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                      <Link className="dropdown-item" onClick={handleClick}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row mx-md-3">
            <div className="col-md-6">
              <div className="mb-5">
                <h2 className="text-white">Active Projects</h2>
                <div className="p-3 bg-info rounded-4">
                  <ul className="list-group list-group-flush mb-1">
                    {activeProjects && activeProjects.map((aciveProject, index) => (
                      <>
                        {index < 4 ? (
                          <li key={index} class="list-group-item bg-info text-white border-white h5">
                            {aciveProject.projectName}
                          </li>
                        ) : ""
                        }
                      </>
                    ))}
                  </ul>
                  <p className="text-end mb-0">
                    <Link
                      to="/admin-dashboard/all-projects"
                      className="text-dark text-decoration-none fw-bold"
                    >
                      <i className="fa-solid fa-plus"></i> View All
                    </Link>
                  </p>
                </div>
              </div>
              <div className="mb-5">
                <h2 className="text-white">Latest Requests</h2>
                <div
                  className="p-3 bg-info rounded-4"
                  style={{ minHeight: "20rem" }}
                >
                  {latestRequests && latestRequests.length > 0 ? latestRequests.map((element, index) => (
                    <>
                      {index < 4 ? (
                        <div className="row">
                          <div className="col-12">
                            <h5 className="text-white">
                              {element.ngoName ? element.ngoName + " sent collaboration request" : element.volName ? element.volName + " sent join request" : element.projectName + " creation request"}
                            </h5>
                          </div>
                          <div className="col-12">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <button className="btn btn-primary w-100 rounded-pill text-uppercase" onClick={() => updateRequest(element)}>
                                    Approve
                                  </button>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <button className="btn btn-coach w-100 rounded-pill text-uppercase" onClick={() => deleteRequest(element)}>
                                    Reject
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : ""}
                    </>
                  )) : ""}
                </div>
              </div>
            </div>

            <div className="col-md-4 ms-auto">
              <div className="mb-3">
                <h2 className="text-white">Announcements</h2>
                <div
                  className="py-4 bg-info rounded-4 notifications__area"
                  style={{
                    height: "40rem",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  <div className="p-3 rounded-3 mb-2 bg-secondary">
                    <div className="row align-items-center mb-2">
                      <div className="col-7">
                        <div className="row g-2 align-items-center">
                          <div className="col-3">
                            <img
                              src={require("../assets/images/noti-icon.png")}
                              alt="alt-text"
                              className="img-fluid w-100"
                            />
                          </div>
                          <div className="col-4">Admin</div>
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="text-end">
                          <small>30m ago</small>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-8">
                        <p className="mb-0 h6">Holiday Update!</p>
                        <small>
                          All projects will be closed on Independence day.
                        </small>
                      </div>
                      <div className="col-4">
                        <div className="text-end">
                          <img
                            src={require("../assets/images/holiday.png")}
                            alt="alt-text"
                            className="img-fluid w-75"
                          />
                        </div>
                      </div>
                    </div>
                    <small className="text-secondary">2 more notifcations</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-evenly mx-md-3">
            <div className="col-md-3">
              <div className="mb-3">
                <div className="card bg-info border-0 p-3">
                  <h5 className="text-white text-center fw-bold">Voluteers</h5>
                  <p className="text-center text-white mb-0">
                    <i className="fa-solid fa-arrow-up"></i>{" "}
                    <span className="fw-bold">{count.volunteers}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <div className="card bg-info border-0 p-3">
                  <h5 className="text-white text-center fw-bold">NGO's</h5>
                  <p className="text-center text-white mb-0">
                    <i className="fa-solid fa-arrow-up"></i>{" "}
                    <span className="fw-bold">{count.ngos}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <div className="card bg-info border-0 p-3">
                  <h5 className="text-white text-center fw-bold">Projects</h5>
                  <p className="text-center text-white mb-0">
                    <i className="fa-solid fa-arrow-up"></i>{" "}
                    <span className="fw-bold">{count.project}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  else{
    navigate("/logins")
  }
};

export default AdminIndex;
