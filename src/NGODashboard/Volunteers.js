import { useEffect, useState } from "react";
import { BASEURL, getVolNgoProjects, ngo } from "../constants";
import axios from "axios";
import userIcon from "../assets/images/userIcon.png";
import auth from "../services/authService";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    userAuthAndDetails();
  }, []);

  useEffect(() => {
    getVol();
  }, [user]);

  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    setUser(userDetail);
  };
  const getVol = async () => {
    try {
      let data = { id: user._id };
      let url = BASEURL + ngo.getVolNgoProjects;
      const responce = await axios.post(url, data);
      if (responce && responce.data) {
        setVolunteers(responce.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
                  style={{
                    minWidth: "200px",
                  }}
                  className="fw-bold border-start text-nowrap border-end h5 py-3"
                >
                  Name
                </th>
                <th
                  style={{
                    minWidth: "200px",
                  }}
                  className="fw-bold border-start border-end h5 py-3"
                >
                  Contact No.
                </th>
                <th
                  style={{
                    minWidth: "200px",
                  }}
                  className="fw-bold h5 py-3"
                >
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {volunteers &&
                volunteers.map((vol, index) => (
                  <tr className="bg-success my-2" key={index + 1}>
                    <td className="h5">{index + 1}</td>
                    <td className="text-nowrap">
                      <img
                        src={
                          vol && vol.profileImage ? vol.profileImage : userIcon
                        }
                        alt="alt-text"
                        width={"30rem"}
                        className="img-fluid"
                      />
                      <span className="h5 ms-2 text-wrap">{vol.fullname}</span>
                      {/* <td className="h5">{vol.project.projectName}</td> */}
                    </td>
                    <td className="h5 text-nowrap">{vol.phone}</td>
                    <td className="h5 text-nowrap">{vol.address}</td>
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
