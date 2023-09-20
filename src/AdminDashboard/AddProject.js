import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL, projectApis } from "../constants";
import axios from "axios";
import { message } from "antd";
import auth from "../services/authService";

const AddProject = () => {

  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(null);
  const initialValues = {
    description: "",
    uploadDate: "",
    endDate: "",
    location: "",
    projectName: "",
    serviceCategory: "Education"

  }
  const [user, setUser] = useState([]);
  useEffect(() => {
    userAuthAndDetails();
  }, [])
  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    setUser(userDetail);
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);
  };
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, action) => {
      try {
        let formData = new FormData();
        formData.append("ngoId", user._id);
        formData.append("ngoName", user.email);
        formData.append("description", values.description);
        formData.append("uploadDate", values.uploadDate);
        formData.append("endDate", values.endDate);
        formData.append("location", values.location);
        formData.append("projectName", values.projectName);
        formData.append("projectCover", coverImage);
        formData.append("isActive", true);
        formData.append("serviceCategory", values.serviceCategory);
        const responce = await axios.post(BASEURL + projectApis.createProject, formData);
        if (responce && responce.data) {
          message.success(" Successfully created");
          action.resetForm();
          navigate("/admin-dashboard/all-projects")
        }
        else {
          const error = await responce.json(); 
          message.error(error.message);;
            action.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
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
                <input type="text" name="projectName" value={values.projectName} onBlur={handleBlur} required onChange={handleChange} className="form-control" />
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
                <input type="text" name="location" value={values.location} onBlur={handleBlur} required onChange={handleChange} className="form-control" />
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
                <input type="text" name="description" value={values.description} onBlur={handleBlur} required onChange={handleChange} className="form-control" />
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
                <input type="date" name="uploadDate" value={values.uploadDate} onBlur={handleBlur} required onChange={handleChange} className="form-control" />
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
                <input type="date" name="endDate" value={values.endDate} onBlur={handleBlur} required onChange={handleChange} className="form-control" />
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
                <select name="serviceCategory" value={values.serviceCategory} onBlur={handleBlur} required onChange={handleChange} className="form-select" id="">
                  <option selected disabled>
                    -- Select Service Category --
                  </option>
                  {user && user.serviceCategory && user.serviceCategory.length > 0 && user.serviceCategory.map((element ) => (
                    <option value={element}>
                      {element}
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
      </div>
    </>
  );
};

export default AddProject;
