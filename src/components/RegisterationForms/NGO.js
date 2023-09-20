import { useFormik } from "formik";
import {useNavigate } from "react-router-dom";
import { BASEURL, ngo } from "../../constants";
import axios from "axios";
import { message } from "antd";
import { useState } from "react";
import Header from "../Header";

const NGO = () => {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const initialValues = {
    ngoName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    description: "",
    profileImage: null,
    coverImage: null,
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, action) => {
      console.log(values);
        let data = new FormData();
        data.append("ngoName", values.ngoName);
        data.append("email", values.email);
        data.append("phone", values.phone);
        data.append("password", values.password);
        data.append("address", values.address);
        data.append("description", values.description);
        data.append("confirmPassword", values.confirmPassword);
        data.append("isActive", false);
        data.append("certificate", certificate);
        const res = await axios.post(BASEURL + ngo.register, data);

        if (res.status === 200 || res.ok) {
          message.success("Registered Successfully");
          action.resetForm();
          navigate("/ngo-login");
        } else {
          const error = await res.json(); 
          message.error(error.message)
                }
    },
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("File Size : ");
    console.log(file.size);
    const fileSizeInMB = file.size / (1024 * 1024);
    console.log("File Size in MB: ");
    console.log(fileSizeInMB);
    if (fileSizeInMB > 10) {
      message.error('File size exceeds 10 MB');
      return;
    }
    setCertificate(file);
  };
  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="col-md-9 mx-auto">
          <div className="card rounded-4 p-md-5 p-3">
            <div className="card-header card-gradient">
              <div className="text-center">
                <img
                  src={require("../../assets/logos/logo.png")}
                  alt=""
                  className="img-fluid w-25"
                />
              </div>
            </div>
            <div className="card-body">
              <form
                className="row g-3"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="col-md-6">
                  <label htmlFor="ngoName" className="form-label">
                    NGO Name<span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0" id="basic-addon1">
                      <i class="fa-solid fa-building-ngo fs-4"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      placeholder="Enter NGO name"
                      required
                      value={values.ngoName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="ngoName"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-hashtag fs-4"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      placeholder="Enter NGO Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Location (Address)<span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text">
                      <i class="fa-solid fa-location-dot fs-4"></i>
                    </span>
                    <textarea
                      class="form-control bg-light border-0"
                      placeholder="Enter address"
                      required
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="address"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email<span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-envelope fs-4"></i>
                    </span>
                    <input
                      type="email"
                      class="form-control bg-light border-0"
                      placeholder="i.e. name@email.com"
                      required
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="certificate"
                    className="form-label text-nowrap"
                  >
                    Registeration Certificate{" "}
                  </label>
                  <input
                    type="file"
                    name="certificate"
                    id=""
                    required
                    className="form-control bg-light border-dark border border-2"
                    value={values.certificate}
                    onChange={handleFileChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="phone" className="form-label">
                    Phone Number<span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-mobile fs-4"></i>
                    </span>
                    <input
                      type="number"
                      class="form-control bg-light border-0"
                      placeholder="Mobile no."
                      required
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="password" className="form-label">
                    Password<span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-lock fs-4"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control bg-light border-0"
                      placeholder="Type your password"
                      required
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                    <span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-lock fs-4"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control bg-light border-0"
                      placeholder="Confirm password"
                      required
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="confirmPassword"
                    />
                  </div>
                </div>
                <div className="col-md-3 ms-auto">
                  <button className="btn btn-primary w-100 mt-3" type="submit">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NGO;
