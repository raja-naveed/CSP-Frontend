import { Link } from "react-router-dom";
import Header from "./Header";

const Logins = () => {
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
          <h1 className="text-center text-white mb-md-5 mb-3">Login</h1>
          <div className="row">
            <div className="col-md-4 col-sm-6 col-12">
              <div className="mb-md-0 mb-3">
                <div class="card rounded-4">
                  <div class="card-body">
                    <h4 class="card-title text-center">Admin</h4>
                    <p class="card-text text-center">Login as Admin</p>
                    <div className="col-md-6 mx-auto">
                      <Link to="/admin-login" className="btn btn-primary w-100">
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12">
              <div className="mb-md-0 mb-3">
                <div class="card rounded-4">
                  <div class="card-body">
                    <h4 class="card-title text-center">NGO</h4>
                    <p class="card-text text-center">Login as NGO</p>
                    <div className="col-md-6 mx-auto">
                      <Link to="/ngo-login" className="btn btn-primary w-100">
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12">
              <div className="mb-md-0 mb-3">
                <div class="card rounded-4">
                  <div class="card-body">
                    <h4 class="card-title text-center">Volunteer</h4>
                    <p class="card-text text-center">Login as Volunteer</p>
                    <div className="col-md-6 mx-auto">
                      <Link
                        to="/volunteer-login"
                        className="btn btn-primary w-100"
                      >
                        Login
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

export default Logins;
