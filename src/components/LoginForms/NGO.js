import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { BASEURL, ngo } from "../../constants";
import { message } from "antd";
import Header from "../Header";

const NGO = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, action) => {
      console.log(values);
      try {
        let data = {
          email: values.email,
          password: values.password,
        };
        const responce = await fetch(BASEURL + ngo.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        });
        if (responce.status === 400 || !responce) {
          message.error("Invalid Credentials or Account not Activated");
        } else {
          message.success("Login Successfully");
          action.resetForm();
          navigate("/ngo-dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Header />
      <main className="container mt-5">
        <div className="col-md-6 col-sm-9 col-10 mx-auto">
          <div className="card rounded-4 p-md-5 p-3">
            <div className="card-heade card-gradient">
              <div className="text-center">
                <img
                  src={require("../../assets/logos/logo.png")}
                  alt=""
                  className="img-fluid w-50"
                />
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label for="validationCustom01" class="form-label">
                        Email
                      </label>
                      <input
                        autocomplete="off"
                        type="email"
                        className="form-control"
                        placeholder="i.e. name@email.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label for="validationCustom03" class="form-label">
                        Password
                      </label>
                      <input
                        autocomplete="off"
                        type="password"
                        className="form-control"
                        id="validationCustom03"
                        placeholder="Enter your password"
                        required
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                      />
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <button class="btn btn-primary w-100" type="submit">
                      Login
                    </button>
                  </div>
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
