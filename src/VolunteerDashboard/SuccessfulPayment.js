import { Link } from "react-router-dom";

const SuccessfulPayment = () => {
  return (
    <>
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/images/all-projects-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Your Projects</h1>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-11 mx-auto py-5">
        <div className="p-3 bg-white rounded-5 my-5">
          <div className="text-center mb-3">
            <img
              src={require("../assets/images/sucessful-payment.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="text-center mb-3">
            <p className="mb-0">Thank you for your generous</p>
            <p className="fw-bold">DONATION!</p>
          </div>
          <div className="text-center mb-3">
            <img
              src={require("../assets/images/thumbs-up.png")}
              alt="alt-text"
              className="img-fluid"
            />
            <div className="col-md-3 mx-auto mt-5">
              <Link className="btn btn-primary fw-bold w-100" to={"/volunteer-dashboard/donations"}>PLEASUE!</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessfulPayment;
