import { Link } from "react-router-dom";

const Support = () => {
  return (
    <>
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/images/support-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Support</h1>
          </div>
        </div>
      </div>

      <div className="container p-3">
        <div className="bg-white p-3 rounded-3" style={{ minHeight: "35rem" }}>
          <div className="row mb-3">
            <div className="col-md-1 col-12">
              <div className="mb-3">
                <Link to="/ngo-dashboard" className="btn px-0">
                  <i className="fa-solid fa-arrow-left fs-3"></i>
                </Link>
              </div>
            </div>
            <div className="col-10">
              <div className="mb-3">
                <h4 className="text-md-center">
                  FAQ <br className="d-md-block d-none" /> How can we help you?{" "}
                </h4>
              </div>
            </div>
            <div className="col-md-4 mx-auto">
              <div className="input-group border rounded mb-3">
                <button className="btn bg-light" type="button">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <input
                  type="search"
                  className="form-control border-0 bg-light"
                  placeholder="Enter your keyword"
                />
              </div>
            </div>
          </div>
          <div className="row mb-md-4 mb-3">
            <div className="col-md-2">
              <Link
                to="/ngo-dashboard/chat-with-admin"
                className="text-decoration-none text-dark"
              >
                <div className="p-3 bg-primary bg-opacity-25 rounded-3 text-md-start text-center">
                  <div className="mb-2">
                    <img
                      src={require("../assets/icons/chat-icon.png")}
                      alt="alt-text"
                      className="img-fluid"
                    />
                  </div>
                  <small className="text-secondary">Direct chat with</small>
                  <p className="mb-0 fw-bold">Admin</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <p className="fw-bold">Top Questions</p>
            </div>
            <div className="col-6">
              <div className="text-end">
                <button className="btn fw-bold text-danger py-0">
                  View all
                </button>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <div className="rounded-3 border p-3">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <p className="fw-bold mb-0">
                    How to collaborate with volunteers?
                  </p>
                  <button className="btn py-0">
                    <i className="fa-solid fa-minus text-danger fs-4"></i>
                  </button>
                </div>
                <p className="text-secondary">
                  Open the app to get started and follow the steps. First go to
                  the volunteers page and then the contact number will be given,
                  call them and collaborate with them.
                </p>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <div className="rounded-3 border p-3">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <p className="fw-bold mb-0">
                    How to collaborate with volunteers?
                  </p>
                  <button className="btn py-0">
                    <i className="fa-solid fa-minus text-danger fs-4"></i>
                  </button>
                </div>
                <p className="text-secondary">
                  Open the app to get started and follow the steps. First go to
                  the volunteers page and then the contact number will be given,
                  call them and collaborate with them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
