import { Link ,useNavigate} from "react-router-dom";
import auth from "../services/authService";
import userIcon from "../assets/images/userIcon.png";
import { BASEURL, logout, projectApis } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
const NGOIndex = () => {
  const [ activeProjects , setActiveProjects ] = useState([]);
  const [user , setUser] = useState({});
  const navigate = useNavigate(null);
  useEffect(() => {
    userAuthAndDetails();
  }, [])

  useEffect(() => {
    getProjects();;
  }, [user])

  const handleClick = () =>{
    logout();
  }

  const userAuthAndDetails = async() =>{
    const userDetail = await auth.authUser();
    setUser(userDetail)
  }

  const getProjects = async () => {
    try {
      let data = { ngoId: user._id }
      let url = BASEURL + projectApis.getProjectsByNgoId
      let response = await axios.post(url, data);
      if (response && response.data) {
        setActiveProjects(response.data)
      }
      else {
        message.error("Error occured.");
        message.info("Try again later");
      }
    }
    catch (error) {
     // message.error("No Active Projects Found")
    }
  };
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
                    <p className="fw-bold text-white mb-0">{user.ngoName}</p>
                    <small className="text-white">NGO</small>
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
                        src={user.profileImage ? user.profileImage : userIcon}
                        alt="alt-text"
                        className="img-fluid"
                        style={{borderRadius:"25px"}}
                      />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          to="/ngo-dashboard/ngo-profile"
                          className="dropdown-item"
                        >
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/ngo-dashboard/edit-profile"
                        >
                          Edit Profile
                        </Link>
                      </li>
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
              <h2 className="text-white">Active Projects</h2>
              <div className="p-3 bg-info rounded-4">
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
        </div>
      </>
    );
  }else{
    navigate("/logins")
  }
};

export default NGOIndex;
