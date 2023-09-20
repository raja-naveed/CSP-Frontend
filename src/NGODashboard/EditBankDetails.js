import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASEURL = process.env.BASEURL;

const EditBankDetails = ({ editbankdetail }) => {
  const navigate = useNavigate()
  console.log(editbankdetail._id, "editbankdetail");
  const initialValues = {
    account: "",
    title: "",
    accountnumber: "",
    branch: "",
    phone: "",
    iban:""
  };
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: (values, action) => {
      console.log(values);
      axios
        .put(`${BASEURL}/ngo/bankdetails/${editbankdetail._id}`, values)
        .then((response) => {
          // Handle successful response
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });

      action.resetForm();
      navigate('/ngo-dashboard/bank-account-details')
    },
  });

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
              <h1 className="fw-bold text-white mb-0">Banking Details</h1>
            </div>
          </div>
        </div>

        <div className="container px-md-5">
          <div className="col-md-2 ms-auto">
            <div className="mb-md-5 mb-3">
              <Link
                to="/ngo-dashboard/bank-account-details"
                className="btn btn-primary w-100"
              >
                Back
              </Link>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center mb-3">
              <div className="col-md-4">
                <label
                  htmlFor="full_name"
                  className="form-label text-white fw-bold"
                >
                  Bank
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="account"
                    value={values.account}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-md-4">
                <label
                  htmlFor="email"
                  className="form-label text-white fw-bold"
                >
                  Title
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  Account Number
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    name="accountnumber"
                    value={values.accountnumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  IBAN
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    name="iban"
                    value={values.iban}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  Branch Code
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="branch"
                    value={values.branch}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  Phone
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2 mx-auto">
                <button type="submit" className="btn btn-primary w-100"
                >
                  UPDATE
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default EditBankDetails;
