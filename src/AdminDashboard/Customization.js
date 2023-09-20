import axios from "axios";
import { BASEURL, admin, ngo } from "../constants";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

const Customization = () => {
  const [serviceCategory, setServiceCategory] = useState({});
  const [file, setFile] = useState({});
  const [multipleFiles, setFiles] = useState([]);
  const [images ,setImages] = useState(null);
  const updateCategory = async () => {
    let option = document.getElementById("add").value;
    if (option === "") {
      message.error("Please enter category");
      return;
    }
    try {
      let data = { category: option}
      const response = await axios.put(BASEURL + admin.updateCategory, data);
    if (response && response.data) {
      message.success("Category added");
      document.getElementById("add").value = ""
      getServiceCategory();
    }
    else {
      message.error("Error");
    }
  } catch (error) {
    console.log(error);
  }
  }

  const deleteCategory = async (category) => {
    let data = { category: category }
    const response = await axios.post(BASEURL + admin.deleteCategory, data);
    if (response && response.data) {
      message.success("Category deleted");
      getServiceCategory();
    }
    else {
      message.error("Error");
    }
  }
  useEffect(() => {
    getServiceCategory();
    getSlider();
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

  const initialValues = {
    mission: "",
    description: ""
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleMultipleFileChange = (event) => {

    if (event.target.files.length === 3) {
      console.log(event.target.files);
      setFiles(event.target.files);
    }
    else {
      message.error("Select 3 Images")
    }
  }
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, action) => {
      try {
        let formData = new FormData();
        formData.append("image", file);
        formData.append("mission", values.mission);
        formData.append("description", values.description);
        const responce = await axios.put(BASEURL + admin.updateMission, formData);
        if (responce && responce.data) {
          message.success(" Successfully Updated");
          action.resetForm();
        }
        else {
          message.error("Error updating");
          action.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  const handleFilesSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      for (let i = 0; i < multipleFiles.length; i++) {
        formData.append('file', multipleFiles[i]);
      }

      const response = await axios.post(BASEURL + admin.sliderImages, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response && response.data) {
        message.success("Layout added");
        getSlider();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getSlider = async()=>{
    try {
      const response = await axios.get(BASEURL + admin.getSlider);
      if(response && response.data){
        setImages(response.data.data);
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
              src={require("../assets/images/customization-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Customization</h1>
          </div>
        </div>
      </div>

      <div className="container p-md-5">
        <div className="bg-white rounded-4" style={{ minHeight: "25rem" }}>
          <div className="bg-gray rounded-4 p-2 mb-3">
            <h1>Manage Your Web</h1>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link fw-bold text-dark active"
                  id="pills-layout-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-layout"
                  type="button"
                  role="tab"
                  aria-controls="pills-layout"
                  aria-selected="true"
                >
                  Layout
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link fw-bold text-dark"
                  id="pills-service-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-service"
                  type="button"
                  role="tab"
                  aria-controls="pills-service"
                  aria-selected="false"
                >
                  Service Category
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link fw-bold text-dark"
                  id="pills-info-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-info"
                  type="button"
                  role="tab"
                  aria-controls="pills-info"
                  aria-selected="false"
                >
                  Basic Info
                </button>
              </li>
            </ul>
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-layout"
              role="tabpanel"
              aria-labelledby="pills-layout-tab"
              tabindex="0"
            >
              <div className="p-3 bg-success rounded-4 p-2 mb-3">
                <div className="row">
                  <div className="col-md-1">
                    <div className="text-center mb-md-0 mb-2">
                      <img
                        src={require("../assets/icons/slideshow-icon.png")}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <p className="fw-bold h4 mb-md-0 mb-2">
                      Web slider which will be shown on starting page.
                      <small className="fw-light h6">
                        (Add minimum 3 images)
                      </small>
                    </p>
                  </div>
                  <div className="col-md-2">
                    <form onSubmit={handleFilesSubmit} encType="multipart/form-data">
                      <div className="position-relative">
                        <input
                          type="file"
                          name=""
                          id=""
                          className="position-absolute w-75 translate-middle start-50 top-40 opacity-3"
                          multiple
                          onChange={handleMultipleFileChange}
                          style={{ cursor: "pointer" }}
                        />
                        <button
                          className="btn btn-primary w-100"
                          style={{ cursor: "pointer", marginTop: "15px" }}
                          type="submit"
                        >
                          Add <i className="fa-solid fa-upload"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-success rounded-4 p-2">
                <form action="" method="get">
                  <div className="row">
                    {images && images.map((item ,index) => (
                      <div className="col-md-4 col-6" key={index} >
                        <div className="mb-3">
                          <div className="position-relative">
                            <img
                              src={item}
                              alt=""
                              width="200rem"
                              height="200rem"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-service"
              role="tabpanel"
              aria-labelledby="pills-service-tab"
              tabindex="0"
            >
              <div className="p-3">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label
                        htmlFor="add_categories"
                        className="form-label fw-bold h4"
                      >
                        Add Categories
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        required
                        placeholder="example: HEALTH SERVICES, DISASTER MANAGEMENT ETC."
                        id="add"
                      />
                    </div>
                  </div>
                  {/* <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="category_description"
                          className="form-label fw-bold h4"
                        >
                          Add Category Description
                        </label>
                        <textarea
                          name="category_description"
                          className="form-control"
                          id=""
                          cols="30"
                          rows="5"
                          placeholder="Describe about category."
                        ></textarea>
                      </div>
                    </div> */}
                  <div className="col-md-4 ms-auto">
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-md-5">
                          <button
                            className="btn btn-primary w-100 text-uppercase"
                            onClick={updateCategory}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label
                        htmlFor="active_categories"
                        className="form-label fw-bold h4"
                      >
                        Active Categories
                      </label>
                      <div className="d-flex flex-wrap justify-content-start gap-1 p-3">
                        {serviceCategory && serviceCategory.length > 0 && serviceCategory.map((e, index) => (
                          <span key={index} className="badge rounded-pill text-bg-secondary">
                            {e} management
                            <button className="btn p-0" onClick={() => deleteCategory(e)}>
                              <i className="fa-regular fa-circle-xmark text-light ms-1"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-info"
              role="tabpanel"
              aria-labelledby="pills-info-tab"
              tabindex="0"
            >
              <div className="p-3">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-5 ms-auto">
                      <div className="mb-3">
                        <div className="row">
                          <div className="col-md-7">
                          </div>
                          <div className="col-md-5">
                            <button
                              className="btn btn-primary w-100 text-uppercase"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="motivational_statement"
                          className="form-label h4"
                        >
                          Motivational Statement
                        </label>
                        <input
                          type="text"
                          name="mission"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mission}
                          id=""
                          className="form-control"
                          placeholder="any Quotes or mission statement"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="motivational_statement"
                          className="form-label h4"
                        >
                          Add Image
                          <small className="h-6 fw-light">
                            (this image will shown on description page)
                          </small>
                        </label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleFileChange}
                          id=""
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="motivational_statement"
                          className="form-label h4"
                        >
                          ALFAWZ Description
                        </label>
                        <input
                          type="text"
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          className="form-control"
                          placeholder="Describe about ALFAWZ"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customization;
