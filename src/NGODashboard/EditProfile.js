import { message } from "antd";
import { Link } from "react-router-dom";
import { BASEURL, moveTo, ngoUpdate, volunteerUpdate } from "../constants";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const EditProfile = (props) => {
  const [formData, setFormData] = useState({
    id: props.editProfile._id,
    ngoName: props.editProfile.ngoName,
    description: props.editProfile.description,
    address: props.editProfile.address,
    phone: props.editProfile.phone,
    certificate: null,
    profileImage: null,
    coverImage: null
  });
  const linkRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const name = event.target.name;
    setFormData({ ...formData, [name]: file });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formDataObject = new FormData();
      formDataObject.append("ngoName", formData.ngoName);
      formDataObject.append("description", formData.description);
      formDataObject.append("address", formData.address);
      formDataObject.append("phone", formData.phone);
      if (formData.certificate) {
        formDataObject.append("certificate", formData.certificate);
      }
      if (formData.profileImage) {
        formDataObject.append("profileImage", formData.profileImage);
      }
      if (formData.coverImage) {
        formDataObject.append("coverImage", formData.coverImage);
      }
      console.log(formData, "formData")
      let url = BASEURL + ngoUpdate + formData.id;
      const res = await axios.put(url, formDataObject);
      if (res.status !== 200) {
        message.error("Error");
      } else {
        message.success("Updated Successfully");
        linkRef.current.click();
        setFormData({
          ngoName: "",
          description: "",
          address: "",
          certificate: null,
          phone: "",
          coverImage: null,
          profileImage: null
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/*Edit Profile Information Heading*/}
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/images/profile-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">
              Edit Profile Information
            </h1>
          </div>
        </div>
      </div>
      <div className="container px-md-5">
        {/*Back Button*/}
        <div className="row mb-3">
          <div className="col-md-2 ms-auto">
            <div className="mb-md-5 mb-3">
              <Link
                to="/ngo-dashboard/my-profile"
                className="btn btn-primary w-100"
              >
                Back
              </Link>
            </div>
          </div>
        </div>

        {/*Name*/}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label
                htmlFor="full_name"
                className="form-label text-white fw-bold"
              >
                Name
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  type="text"
                  name="ngoName"
                  value={formData.ngoName}
                  className="form-control text-white bg-transparent"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/*Description*/}
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
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  className="form-control  text-white bg-transparent"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/*Registration No.*/}
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label
                htmlFor="registeration_no"
                className="form-label text-white fw-bold"
              >
                Registeration No.
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  name="phone"
                  type="text"
                  value={formData.phone}
                  className="form-control  text-white bg-transparent"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/*Address*/}
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label
                htmlFor="address"
                className="form-label text-white fw-bold"
              >
                Address
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  className="form-control  text-white bg-transparent"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/*Upload Certificate*/}
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label
                htmlFor="certificate"
                className="form-label text-white fw-bold"
              >
                Upload Certificate
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  type="file"
                  accept="images/*"
                  name="certificate"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          {/*Profile Image*/}
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label
                htmlFor="profileImage"
                className="form-label text-white fw-bold"
              >
                Profile Image
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleFileChange}
                  accept="images/*"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          {/*Cover Image*/}
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <label
                htmlFor="coverImage"
                className="form-label text-white fw-bold"
              >
                Cover Image
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleFileChange}
                  accept="images/*"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          {/*Update Button*/}
          <div className="row">
            <div className="col-md-2 mx-auto">
              <button type="submit" className="btn btn-primary w-100">
                UPDATE
              </button>
            </div>
          </div>
          <Link to="/ngo-dashboard/my-profile" ref={linkRef} />
        </form>
      </div>
    </>
  );
};

export default EditProfile;
