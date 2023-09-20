import { Link } from "react-router-dom";
import Header from "./Header";

const JoinUs = () => {
  return (
    <>
      <Header />
      {/* <header className="">
        <div className="container">
          <div className="text-md-start text-center">
            <img
              src={require("../assets/logos/logo.png")}
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </header> */}

      <main className="my-md-5 my-3">
        <div className="container">
          <h1 className="text-center text-white mb-md-5 mb-3">
            Join{" "}
            <Link to="/" className="text-decoration-none text-info">
              ALFAWZ
            </Link>
          </h1>
          <div className="row justify-content-evenly">
            <div className="col-sm-5">
              <div className="mb-md-0 mb-3">
                <div class="card  rounded-4">
                  <div class="card-body">
                    <h4 class="card-title text-center">NGO</h4>
                    <p class="card-text">To join as ngo register click below</p>
                    <div className="col-md-6 mx-auto">
                      <Link
                        to="/ngo-register"
                        className="btn btn-primary w-100"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="mb-md-0 mb-3">
                <div class="card  rounded-4">
                  <div class="card-body">
                    <h4 class="card-title text-center">Volunteer</h4>
                    <p class="card-text">
                      To join as volunteer register click below
                    </p>
                    <div className="col-md-6 mx-auto">
                      <Link
                        to="/volunteer-register"
                        className="btn btn-primary w-100"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default JoinUs;
