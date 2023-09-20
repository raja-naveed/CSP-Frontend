import { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { BASEURL, admin, projectApis } from "../constants";
import axios from "axios";
import { message } from "antd";
import userIcon from ".././assets/images/userIcon.png";
import { useEffect } from "react";
const Volunteers = () => {
  const [volunteer, setVolunteer] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.projectId) {
      getAllVolInProject(location.state.projectId);
    } else {
      getActiveVolunteer();
    }
  }, []);

  const getActiveVolunteer = async () => {
    try {
      const response = await axios.get(BASEURL + admin.activeVolunteer);
      if (response && response.data) {
        setVolunteer(response.data);
      } else {
        message.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllVolInProject = async (id) => {
    try {
      let data = { id: id };
      const response = await axios.post(BASEURL + projectApis.getAllVol, data);
      if (response && response.data) {
        setVolunteer(response.data.data);
      } else {
        message.info("No Volunteer found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSelectChange(event, id) {
    if (event.target.value === "Disabled") {
      try {
        let data = { _id: id, isActive: false };
        const response = await axios.put(BASEURL + admin.disableUser, data);
        if (response && response.data) {
          message.success("User Updated");
          getActiveVolunteer();
          // event.target.value = "Enabled";
        } else {
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
              src={require("../assets/images/volunteers-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Volunteers</h1>
          </div>
        </div>
      </div>

      <div className="container px-md-5">
        <div className="table-responsive">
          <table className="table table-borderless">
            <thead className="bg-light">
              <tr>
                <th className="fw-bold h5 py-3">#</th>
                <th
                  className="fw-bold text-nowrap border-start border-end h5 py-3"
                  style={{
                    minWidth: "200px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    minWidth: "200px",
                  }}
                  className="fw-bold border-start border-end h5 py-3 text-nowrap"
                >
                  Contact No.
                </th>
                <th
                  style={{
                    minWidth: "200px",
                  }}
                  className="fw-bold h5 py-3 text-nowrap"
                >
                  Address
                </th>
                <th
                  style={{
                    minWidth: "200px",
                  }}
                  className="fw-bold h5 py-3 text-nowrap"
                >
                  Projects
                </th>
                <th
                  style={{
                    minWidth: "200px",
                  }}
                  className="fw-bold h5 py-3 text-nowrap"
                >
                  User Status
                </th>
              </tr>
            </thead>
            <tbody>
              {volunteer &&
                volunteer.length > 0 &&
                volunteer.map((vol, index) => (
                  <tr className="bg-success my-2">
                    <td className="h5">{index + 1}</td>
                    <td className="text-nowrap">
                      <img
                        src={vol.profileImage ? vol.profileImage : userIcon}
                        width={"30rem"}
                        alt="alt-text"
                        className="img-fluid"
                      />
                      <span className="h5 ms-2 text-wrap">{vol.fullname}</span>
                    </td>
                    <td className="h5 text-nowrap">{vol.phone}</td>
                    <td className="h5 text-nowrap">{vol.address}</td>
                    <td>
                      <div
                        onClick={() =>
                          navigate("/admin-dashboard/volunteer-projects", {
                            state: { id: vol._id },
                          })
                        }
                        className="btn btn-danger text-uppercase"
                      >
                        See All
                      </div>
                    </td>
                    <td>
                      <form action="" method="get">
                        <select
                          name=""
                          id=""
                          className="form-select bg-info"
                          onChange={(event) =>
                            handleSelectChange(event, vol._id)
                          }
                        >
                          <option value="Enabled" selected>
                            Enabled
                          </option>
                          <option value="Disabled">Disabled</option>
                        </select>
                      </form>
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

export default Volunteers;
