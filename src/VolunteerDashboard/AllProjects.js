import { useEffect, useRef, useState } from "react";
import { BASEURL, projectApis, } from "../constants";
import { message } from "antd";
import moment from "moment/moment";
import axios from "axios";
import { Link } from "react-router-dom";
import auth from "../services/authService";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const linkedRef = useRef(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    userAuthAndDetails();
  }, [])

  useEffect(()=>{
    getProjects();
  },[user]);

  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    setUser(userDetail)
  }
  const getProjects = async () => {
    try {
      if (user) {
        let data = user ? { id: user._id } : null;
        let url = BASEURL + projectApis.getAllExcept
        let response = await axios.post(url, data);
        if (response && response.data) {
          setProjects(response.data)
        }
        else {
          message.error("Error occured.");
          message.info("Try again later");
        }
      }
    }
    catch (error) {
     // message.error(" found")
    }
  };
  const updateProject = async (id) => {
    try {
      let data = {
        vol: {
          id: user._id,
          status: false
        }
      };
      let url = BASEURL + projectApis.addVol + id;
      const responce = await axios.put(url, data);
      if (responce && responce.status === 200) {
        message.success("Successfully Voluntered");
        linkedRef.current.click();
      }
      else {
        message.error("Error");

      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/images/all-projects-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">All Projects</h1>
          </div>
        </div>
      </div>

      <div className="container px-md-5">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="bg-light">
                <th className=" h4">#</th>
                <th className=" h4">Name</th>
                <th className=" h4">Category</th>
                <th className=" h4">Location</th>
                <th className=" h4">Start Date</th>
                <th className=" h4">End Date</th>
                <th style={{ minWidth: "100px" }} className=" h4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {projects && projects.map((project, index) => (
                <tr key={index} className="bg-info">
                  <td className="h5">{index + 1}</td>
                  <td className="h5">{project.projectName}</td>
                  <td className="h5">{project.serviceCategory}</td>
                  <td className="h5">{project.location}</td>
                  <td className="h5">{moment(project.uploadDate).format('LL')}</td>
                  <td className="h5">{moment(project.endDate).format('LL')}</td>
                  <td className="h5" onClick={() => updateProject(project._id)}>
                    <button className="btn btn-warning btn-sm">
                      Volunteer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to={"/volunteer-dashboard/my-projects"} ref={linkedRef} />
      </div>
    </>
  );
};

export default AllProjects;
