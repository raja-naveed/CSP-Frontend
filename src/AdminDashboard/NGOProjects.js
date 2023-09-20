import { useEffect, useState } from "react";
import { BASEURL, projectApis } from "../constants";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { message } from "antd";

const NGOProjects = () => {
  const location = useLocation();
  const [projects , setProjects] =useState([]);


  async function handleSelectChange(event, id) {
    if (event.target.value === "Completed") {
      try {
        let data = { _id: id,completeStatus: true }
        const response = await axios.put(BASEURL + projectApis.updateProject, data);
        if (response && response.data) {
          message.success("Project Updated");
          getProjects();
        }
        else {
          message.error("Error Updating");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(()=>{
    getProjects();
  },[]);

  const getProjects = async()=>{
    try {
      let data = {ngoId : location.state.id};
      let url = BASEURL + projectApis.getProjectsByNgoId;
      const responce = await axios.post(url , data);
      if(responce && responce.data)
      {
          setProjects(responce.data);
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
              src={require("../assets/images/all-projects-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">NGO All Projects</h1>
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
                {/* <th className=" h4">Volunteers</th> */}
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
                  <td className="h5">
                    <select
                      onChange={(event) => handleSelectChange(event, project._id)}
                      className="form-select bg-success border-0 text-white"
                      defaultValue="Ongoing"
                    >
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
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

export default NGOProjects;
