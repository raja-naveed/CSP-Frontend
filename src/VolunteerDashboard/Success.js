import { Link, useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        <div className="p-md-5 p-3 bg-white rounded-5 my-5">
          <div className="text-center mb-3">
            <img
              src={require("../assets/images/success.png")}
              alt=""
              className="img-fluid"
            />
          </div>
          <p className="fw-bold text-dark text-center">
            Congratulations for completing your project successfully.
          </p>
          <p className="text-center text-secondary">
            Would you like to request your incentives?
          </p>
          <div className="buttons text-center">
            <div onClick={()=>navigate("/volunteer-dashboard/request-insentive",{state:{id:location.state.id , ngoId :location.state.ngoId }})}
              className="btn btn-primary mx-1 w-25"
            >
              Yes
            </div>
            <Link
              to="/volunteer-dashboard/all-projects"
              className="btn btn-primary mx-1 w-25"
            >
              No
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
