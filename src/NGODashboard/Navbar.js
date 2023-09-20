import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* sidenav */}
      <aside className="d-md-block d-none h-100">
        <div className="nav-brand text-center">
          <img
            src={require("../assets/logos/logo.png")}
            alt="ALFAWZ logo"
            className="img-fluid"
          />
        </div>

        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <NavLink to="/ngo-dashboard" className="nav-link text-white">
              <div className="row g-0 align-items-center">
                <div className="col-2">
                  <img
                    src={require("../assets/icons/dashboard-icon.png")}
                    className="img-fluid"
                  />
                </div>
                <div className="col-10">
                  <span className="text-white h4">Dashboard</span>
                </div>
              </div>
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              to="/ngo-dashboard/my-profile"
              className="nav-link text-white"
            >
              <div className="row g-0 align-items-center">
                <div className="col-2">
                  <img
                    src={require("../assets/icons/profile-icon.png")}
                    className="img-fluid"
                  />
                </div>
                <div className="col-10">
                  <span className="text-white h4">My Profile</span>
                </div>
              </div>
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <div
              className="accordion bg-trasnparent border-0"
              id="accordionExample"
            >
              <div className="accordion-item bg-transparent border-0">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button bg-transparent px-3 py-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <div className="row g-0 align-items-center w-100">
                      <div className="col-2">
                        <img
                          src={require("../assets/icons/projects-icon.png")}
                          className="img-fluid"
                          style={{ maxWidth: "40px" }}
                        />
                      </div>
                      <div className="col-9">
                        <span className="text-white h4">Projects</span>
                      </div>
                      <div className="col-1">
                        <i className="fa-solid fa-caret-down fs-4 text-white"></i>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body bg-transparent">
                    <NavLink
                      to="/ngo-dashboard/all-projects"
                      className="nav-link fw-bold text-white"
                    >
                      All Projects
                    </NavLink>
                    <NavLink
                      to="/ngo-dashboard/add-project"
                      className="nav-link fw-bold text-white"
                    >
                      Add Projects
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              to="/ngo-dashboard/volunteers"
              className="nav-link text-white"
            >
              <div className="row g-0 align-items-center">
                <div className="col-2">
                  <img
                    src={require("../assets/icons/volunteers-icon.png")}
                    className="img-fluid"
                  />
                </div>
                <div className="col-10">
                  <span className="text-white h4">Volunteers</span>
                </div>
              </div>
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink to="/ngo-dashboard/awards" className="nav-link text-white">
              <div className="row g-0 align-items-center">
                <div className="col-2">
                  <img
                    src={require("../assets/icons/requests-icon.png")}
                    className="img-fluid"
                  />
                </div>
                <div className="col-10">
                  <span className="text-white h4">Awards</span>
                </div>
              </div>
            </NavLink>
          </li>
          {/* <li className="nav-item mb-3">
            <NavLink
              to="/ngo-dashboard/support"
              className="nav-link text-white"
            >
              <div className="row g-0 align-items-center">
                <div className="col-2">
                  <img
                    src={require("../assets/icons/support-icon.png")}
                    className="img-fluid"
                  />
                </div>
                <div className="col-10">
                  <span className="text-white h4">Support</span>
                </div>
              </div>
            </NavLink>
          </li> */}
          <li className="nav-item mb-3">
            <NavLink
              to="/ngo-dashboard/bank-account-details"
              className="nav-link text-white"
            >
              <div className="row g-0 align-items-center">
                <div className="col-2">
                  <img
                    src={require("../assets/icons/volunteers-icon.png")}
                    className="img-fluid"
                  />
                </div>
                <div className="col-10">
                  <span className="text-white h4">Banking Details</span>
                </div>
              </div>
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
