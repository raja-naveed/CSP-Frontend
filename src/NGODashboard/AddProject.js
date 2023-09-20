import { useEffect, useState } from "react";
import { BASEURL, ngo, projectApis } from "../constants";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import auth from "../services/authService";
import axios from "axios";
const AddProject = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [serviceCategory, setServiceCategory] = useState({});
  const [formData, setFormData] = useState({
    ngoId: "",
    ngoName: "",
    projectCover: '',
    description: "",
    uploadDate: "",
    endDate: "",
    projectCover: "",
    location: ""
  })
  useEffect(() => {
    userAuthAndDetails();
    getServiceCategory();
  }, [])

  const getServiceCategory = async () => {
    try {
      const response = await axios.get(BASEURL + ngo.serviceCategory);
      if (response && response.data) {
        setServiceCategory(response.data.data)
      }
      else {
        message.error("Error in fetching category");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    setUser(userDetail)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("file", file)
    setFormData({ ...formData, projectCover: file, ngoId: user._id, ngoName: user.ngoName });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formDataObject = new FormData();
      formDataObject.append("projectName", formData.projectName);
      formDataObject.append("description", formData.description);
      formDataObject.append("ngoId", formData.ngoId);
      formDataObject.append("ngoName", formData.ngoName);
      formDataObject.append("uploadDate", formData.uploadDate);
      formDataObject.append("endDate", formData.endDate);
      formDataObject.append("location", formData.location);
      formDataObject.append("serviceCategory", formData.serviceCategory);
      formDataObject.append("isActive", false);
      if (formData.projectCover) {
        formDataObject.append("projectCover", formData.projectCover);
      }
      let url = BASEURL + projectApis.createProject;
      const res = await fetch(url, {
        method: "POST",
        body: formDataObject
      }
      );
      if (res.ok || res.status === 200) {
        message.success("Created Successfully.");
        message.info("Request Sent to Admin");
        navigate("/ngo-dashboard/all-projects");
        setFormData({
          projectName: "",
          endDate: "",
          location: "",
          projectCover: null,
          uploadDate: "",
          serviceCategory: "",
          description: ""
        });

      } else {
        const error = await res.json(); 
        message.error(error.message);
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
              src={require("../assets/images/add-project-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Add Project</h1>
          </div>
        </div>
      </div>

      <div className="container px-md-5">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label
                htmlFor="project_name"
                className="form-label text-white fw-bold"
              >
                Name
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="text" name="projectName" onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label htmlFor="location" className="form-label text-white fw-bold">
                Location
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="text" name="location" onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label
                htmlFor="description"
                className="form-label text-white fw-bold"
              >
                Description
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="text" name="description" onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label htmlFor="date" className="form-label text-white fw-bold">
                Date
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="date" name="uploadDate" onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label htmlFor="date" className="form-label text-white fw-bold">
                End Date
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="date" name="endDate" onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label
                htmlFor="Service_Category"
                className="form-label text-white fw-bold"
              >
                Service Category
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <select name="serviceCategory" onChange={handleChange} className="form-select" id="">
                  <option selected disabled>
                    -- Select Service Category --
                  </option>
                  {serviceCategory && serviceCategory.length > 0 && serviceCategory.map(e => (
                    <option value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label
                htmlFor="project_cover"
                className="form-label text-white fw-bold"
              >
                Project Cover
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="file" required name="projectCover" accept="images/*" onChange={handleFileChange} className="form-control" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 mx-auto">
              <button className="btn btn-primary w-100" type="submit">Save</button>
            </div>
          </div>
        </form>
      </div >
    </>
  );
};

export default AddProject;
