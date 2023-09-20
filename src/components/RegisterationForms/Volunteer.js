import { useFormik } from "formik";
import { BASEURL, volunteer } from "../../constants";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Volunteer = () => {
  const navigate = useNavigate();
  const initialValues = {
    fullname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    cnic: "",
    institution: "",
    enrollment: "",
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, action) => {
      console.log(values);
      try {
        let data = {
          fullname: values.fullname,
          email: values.email,
          password: values.password,
          phone: values.phone,
          address: values.address,
          confirmPassword: values.confirmPassword,
          cnic: values.cnic,
          institution: values.institution,
          enrollment: values.enrollment,
          isActive: false,
        };
        const res = await axios.post(BASEURL + volunteer.register, data);

        if (res.status === 200 || res.ok) {
          message.success("Registered Successfully");
          action.resetForm();
          navigate("/volunteer-login");
        } else {
          message.error("Registration Failed.");
        }
      } catch (error) {
        console.log(error);
        message.error(error.response.data.error);
      }
    },
  });
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
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label htmlFor="fullname" className="form-label">
                    Name<span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0" id="basic-addon1">
                      <i class="fa-solid fa-user fs-5"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      placeholder="Enter your full name"
                      required
                      value={values.fullname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="fullname"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email<span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-envelope fs-5"></i>
                    </span>
                    <input
                      type="email"
                      class="form-control bg-light border-0"
                      placeholder="i.e. name@email.com"
                      required
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    Phone Number<span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-mobile fs-5"></i>
                    </span>
                    <input
                      type="number"
                      class="form-control bg-light border-0"
                      placeholder="Mobile no."
                      required
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="phone"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cnic" className="form-label">
                    CNIC <span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-id-card-clip fs-5"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      placeholder="13 digit CNIC number"
                      name="cnic"
                      value={values.cnic}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address<span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text">
                      <i class="fa-solid fa-location-dot fs-5"></i>
                    </span>
                    <textarea
                      class="form-control bg-light border-0"
                      placeholder="Enter address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      name="address"
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="institute_name"
                    className="form-label text-nowrap"
                  >
                    Institution{" "}
                    <span className="text-secondary">(optional)</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-school fs-5"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      name="institution"
                      value={values.institution}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your institute name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="enrollment"
                    className="form-label text-nowrap"
                  >
                    Enrollment ID{" "}
                    <span className="text-secondary">(optional)</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-regular fa-id-card fs-5"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      name="enrollment"
                      value={values.enrollment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enrollment ID"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password<span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-lock fs-5"></i>
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
                <div className="col-md-6">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                    <span className="text-danger">*</span>
                  </label>
                  <div class="input-group border border-secondary border-2 rounded">
                    <span class="input-group-text border-0">
                      <i class="fa-solid fa-lock fs-5"></i>
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

export default Volunteer;
