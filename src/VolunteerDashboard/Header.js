import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* header */}
      <header className="d-md-none d-block">
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/ngo-dashboard">
              <img
                src={require("../assets/logos/logo.png")}
                alt="ALFAWZ logo"
                className="img-fluid w-50"
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-bars text-white"></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/volunteer-dashboard"
                    className="nav-link text-white"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/volunteer-dashboard/my-profile"
                    className="nav-link text-white"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Projects
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to="/volunteer-dashboard/my-projects"
                        className="dropdown-item"
                      >
                        My Projects
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/volunteer-dashboard/all-project"
                        className="dropdown-item"
                      >
                        All Project
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/volunteer-dashboard/donations"
                    className="nav-link text-white"
                  >
                    Donations
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/volunteer-dashboard/rewards"
                    className="nav-link text-white"
                  >
                    Rewards
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink
                    to="/volunteer-dashboard/support"
                    className="nav-link text-white"
                  >
                    Support
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
