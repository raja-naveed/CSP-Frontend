import { useState } from "react";
import { BASEURL, admin, projectApis } from "../constants";
import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const ProjectRequests = () => {

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getInactiveProjects();
  }, []);

  const getInactiveProjects = async () => {
    try {
      const response = await axios.get(BASEURL + admin.inActiveProjects);
      if (response && response.data) {
        setProjects(response.data);
      }
      else {
        message.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  }

    const deleteProject = async(id) =>{
    try {
      const response = await axios.delete(BASEURL + projectApis.deleteProject + id)
      if(response && response.data){
        message.success("Request Rejected")
        getInactiveProjects();
      }
      else{
        message.error("Error Rejecting request")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateProject = async(pro)=>{
    try {
      let data = {
        ...pro,
        isActive : true
      }
      const response = await axios.put(BASEURL + projectApis.updateProject ,data);
      if(response && response.data){
        message.success("Project Updated");
        getInactiveProjects();
      }
      else{
        message.error("Error Project Project");
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
            <h1 className="fw-bold text-white mb-0">Project Requests</h1>
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
                  className="fw-bold border-start border-end h5 py-3"
                  style={{ minWidth: "200px" }}
                >
                  Name
                </th>
                <th
                  className="fw-bold border-start border-end h5 py-3"
                  style={{ minWidth: "100px" }}
                >
                  NGO
                </th>
                <th className="fw-bold h5 py-3">Description</th>
                <th className="fw-bold h5 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects && projects.length > 0 && projects.map((pro , index)=>(
              <tr className="bg-success my-2">
                <td className="h5">{index + 1 }</td>
                <td className="h5 text-wrap">{pro.projectName}</td>
                <td className="h5 text-nowrap">{pro.ngoName}</td>
                <td className="h5 text-wrap">
                  {pro.description}
                </td>
                <td className="text-center text-nowarp">
                  <div class="btn-group text-nowrap">
                    <button className="btnbtn-sm btn-sm btn-primary text-uppercase" onClick={()=>updateProject(pro)} > 
                      Approve
                    </button>
                    <button className="btnbtn-sm btn-sm btn-danger text-uppercase" onClick={()=>deleteProject(pro._id)}>
                      Reject
                    </button>
                  </div>
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

export default ProjectRequests;
