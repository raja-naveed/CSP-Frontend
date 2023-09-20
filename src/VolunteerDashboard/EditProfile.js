import { Link } from "react-router-dom";
import { BASEURL, volunteerUpdate } from "../constants";
import { useState ,useRef, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import auth from "../services/authService";

const EditProfile = () => {
  const linkedRef = useRef(null);
  const [formData, setFormData] = useState({});
  const form = new FormData();


  useEffect(() => {
    userAuthAndDetails();
  }, [])
  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    setFormData({
      id : userDetail._id,
      fullname: userDetail.fullname,
      email: userDetail.email,
      phone: userDetail.phone,
      cnic: userDetail.cnic,
      institution: userDetail.institution,
      address: userDetail.address,
    });
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, profileImage: file });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formDataObject = new FormData();
      formDataObject.append("fullname", formData.fullname);
      formDataObject.append("email", formData.email);
      formDataObject.append("phone", formData.phone);
      formDataObject.append("address", formData.address);
      formDataObject.append("cnic", formData.cnic);
      formDataObject.append("institution", formData.institution);
      if (formData.profileImage) {
        formDataObject.append("profileImage", formData.profileImage);
      }
      let url = BASEURL + volunteerUpdate + formData.id;
      const res = await axios.put(url, formDataObject);
      if (res.status !== 200) {
        const error = await res.json();
        message.error(error.message);

      } else {
        message.success("Updated Successfully");
        linkedRef.current.click();
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          address: "",
          profileImage: null,
          institution: "",
          cnic: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <>
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
          <div className="col-md-2 ms-auto">
            <div className="mb-md-5 mb-3">
              <Link
                to="/volunteer-dashboard/my-profile"
                className="btn btn-primary w-100"
              >
                Back
              </Link>
            </div>
          </div>

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
                    name="fullname"
                    onChange={handleChange}
                    value={formData.fullname}
                    className="form-control text-white bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-md-4">
                <label
                  htmlFor="description"
                  className="form-label text-white fw-bold"
                >
                  Phone
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="number"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    className="form-control text-white bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-md-4">
                <label
                  htmlFor="registeration_no"
                  className="form-label text-white fw-bold"
                >
                  CNIC
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="number"
                    name="cnic"
                    onChange={handleChange}
                    value={formData.cnic}
                    className="form-control text-white bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-md-4">
                <label
                  htmlFor="registeration_no"
                  className="form-label text-white fw-bold"
                >
                  Institute
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    name="institution"
                    onChange={handleChange}
                    value={formData.institution}
                    className="form-control text-white bg-transparent"
                  />
                </div>
              </div>
            </div>
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
                    onChange={handleChange}
                    value={formData.address}
                    className="form-control text-white bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <div className="col-md-4">
                <label
                  htmlFor="profile_image"
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
                    accept="image/*"
                    className="form-control text-white bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2 mx-auto">
                <button type="submit" className="btn btn-primary w-100">
                  UPDATE
                </button>
              </div>
            </div>
          </form>
        </div>
        <Link to={"/volunteer-dashboard/my-profile"} ref={linkedRef} />
      </>
    </>
  );
};

export default EditProfile;
