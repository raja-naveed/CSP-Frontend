import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL, projectApis } from "../constants";
import moment from "moment";
import axios from "axios";
import { message } from "antd";
import auth from "../services/authService";
import { getRoles } from "@testing-library/react";

const MyProjects = () => {

  const [user , setUser] = useState({});
  const [projects , setProjects] =useState([]);
  const navigate = useNavigate(null);
  useEffect(() => {
    userAuthAndDetails();    
  }, []);

  useEffect(()=>{
    getProjects();
  },[user])

  const userAuthAndDetails = async() =>{
    const userDetail = await auth.authUser();
    setUser(userDetail)
  }
  async function handleSelectChange(event , id,ngoId) {
    if (event.target.value === "Done") {
      try {
        let data = {id: id,volId : user._id }
        const response = await axios.put(BASEURL + projectApis.done , data);
        if(response && response.data){
          message.success("Project Updated");
          navigate("/volunteer-dashboard/success",{state:{id:id , ngoId : ngoId}});
        }
        else{
          message.error("Error Updating");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const getProjects = async()=>{
    try {
      let data = user ? {id : user._id} : null;
      let url = BASEURL + projectApis.getByVolId;
      const responce = await axios.post(url , data);
      if(responce && responce.data)
      {
          setProjects(responce.data);
      }

    } catch (error) {
      
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
            <h1 className="fw-bold text-white mb-0">Your Projects</h1>
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
                <th className="h4">Status</th>
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
                    {project.completed === true ? "Completed" : (
                    <select
                      onChange={(event)=>handleSelectChange(event,project.id,project.ngoId)}
                      className="form-select bg-success border-0 text-white"
                      defaultValue="pending"
                    >
                      <option value="Done">Done</option>
                      <option selected value={"pending"}>Pending</option>
                    </select> 
                    ) }
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

export default MyProjects;
