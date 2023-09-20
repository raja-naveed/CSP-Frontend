import React, { useRef, useState } from "react";
import { useFormik} from "formik";
import {
  TextField,
  Button,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import Book from "@mui/icons-material/Book";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CardGiftcardSharp from "@mui/icons-material/CardGiftcardSharp";
import SchoolTwoTone from "@mui/icons-material/SchoolTwoTone";
import Description from "@mui/icons-material/Description";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { message } from "antd";
import { BASEURL, moveTo, ngoRegister, volunteerRegister } from "../constants";
import logo from "../assets/logos/logo.png";

function SignUp() {
  var [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    ngoName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    certificate: null,
    address: "",
    description: "",
    profileImage:null,
    coverImage:null
  });
  const [ngoFields, setngoFields] = useState(null);
  var handleClickShowPassword = () => setShowPassword(!showPassword);
  var handleMouseDownPassword = () => setShowPassword(!showPassword);

  var formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      cnic: "",
      institution: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (!ngoFields) {
        console.log(values);
        try {
          const res = await fetch(BASEURL + volunteerRegister, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullname: values.fullname,
              email: values.email,
              password: values.password,
              phone: values.phone,
              address: values.address,
              confirmPassword: values.confirmPassword,
              cnic: values.cnic,
              institution: values.institution,
              isActive:false
            }),
          });

          if (res.status === 400 || !res) {
            message.error("Already used Credentials");
          } else {
            message.success("Registered Successfully");
            moveTo("Login");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      address: Yup.string().required("Required"),
      phone: Yup.string()
        .max(11, "Must be 11 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      cnic: Yup.string()
        .max(13, "Must be 13 characters or less")
        .required("Required"),
      institution: Yup.string().required("Required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Must be 8 characters or greater")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, certificate: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataObject = new FormData();
    formDataObject.append("ngoName", formData.ngoName);
    formDataObject.append("email", formData.email);
    formDataObject.append("phone", formData.phone);
    formDataObject.append("password", formData.password);
    formDataObject.append("address", formData.address);
    formDataObject.append("description", formData.description);
    formDataObject.append("confirmPassword", formData.confirmPassword);
    formDataObject.append("isActive",false);
    if (formData.certificate) {
      formDataObject.append("certificate", formData.certificate);
    }
    fetch(BASEURL + ngoRegister, {
      method: "POST",
      body: formDataObject,
    })
      .then((response) => {
        if (!response.ok || response.status !== 200) {
          message.error("Already used Credentials Or Missing fields");
        } else {
          message.success("Registered Successfully");
          moveTo("Login");
          setFormData({
            ngoName: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            confirmPassword: "",
            certificate: null,
            description: "",
          });
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response && error.response.status !== 200) {
          error.response.json().then((body) => {
            console.error("Validation errors:", body.errors);
          });
        }
      });
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
        height: window.innerHeight,
      }}
    >
      <div>
        <img src={logo} />
      </div>
      <div style={{ width: "60%" }}>
        <Card>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                Sign Up
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <div>
                <Button
                  onClick={() => {
                    setngoFields(null);
                  }}
                  size={"large"}
                  color={"primary"}
                >
                  {" "}
                  Volunteer
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setngoFields(true);
                  }}
                  size={"large"}
                  color={"error"}
                >
                  {" "}
                  NGO
                </Button>
              </div>
            </div>

            {!ngoFields && ngoFields == null ? (
              <div>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type="text"
                  name="fullname"
                  label="FullName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                  error={formik.touched.fullname && formik.errors.fullname}
                  helperText={formik.touched.fullname && formik.errors.fullname}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type="number"
                  name="phone"
                  label="Phone*"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  error={formik.touched.phone && formik.errors.phone}
                  helperText={formik.touched.phone && formik.errors.phone}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type="text"
                  name="address"
                  label="Address*"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  error={formik.touched.address && formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type="email"
                  name="email"
                  label="Email*"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CardGiftcardSharp />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type="number"
                  name="cnic"
                  label="CNIC*"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.cnic}
                  error={formik.touched.cnic && formik.errors.cnic}
                  helperText={formik.touched.cnic && formik.errors.cnic}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolTwoTone />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type="text"
                  name="institution"
                  label="Institution*"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.institution}
                  error={
                    formik.touched.institution && formik.errors.institution
                  }
                  helperText={
                    formik.touched.institution && formik.errors.institution
                  }
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.touched.password && formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  label="Confirm Password*"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  error={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <Button
                  size="small"
                  style={{ width: "30%", backgroundColor: "#1e2950" }}
                  type="submit"
                  onClick={formik.submitForm}
                  variant="contained"
                  fullWidth
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    type="text"
                    name="ngoName"
                    label="NGO Name"
                    onChange={handleChange}
                    value={formData.ngoName}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Book />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    type="text"
                    name="phone"
                    label="Registration No*"
                    value={formData.phone}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    type="text"
                    name="address"
                    label="Address*"
                    value={formData.address}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    type="email"
                    name="email"
                    label="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Description />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    type="text"
                    name="description"
                    label="Description*"
                    value={formData.description}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <label htmlFor="certificate">Upload certificate: </label>
                  <input
                    type="file"
                    name="certificate"
                    id="certificate"
                    required
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockRoundedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="Password"
                    onChange={handleChange}
                    value={formData.password}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockRoundedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    label="Confirm Password*"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <Button
                    size="small"
                    style={{ width: "30%", backgroundColor: "#1e2950" }}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
