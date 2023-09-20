import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* hero section */}
      <header className="my-md-3">
        <nav className="navbar navbar-expand-md">
          <div className="container">
            <Link
              className="h1 text-decoration-none text-white text-uppercase"
              to="/"
            >
              ALFAWZ
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
              <i className="fa-solid fa-bars text-white fs-2"></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item mx-md-3">
                  <Link className="nav-link text-white fw-bold" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-md-3">
                  <Link className="nav-link text-white fw-bold" to="/join-us">
                    Join Us
                  </Link>
                </li>
                <li className="nav-item mx-md-3">
                  <Link className="nav-link text-white fw-bold" to="/about">
                    About Us
                  </Link>
                </li>
                <li className="nav-item mx-md-3">
                  <Link className="nav-link text-white fw-bold" to="/logins">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item mx-md-3">
                  <button
                    onClick={() => navigate("/publicDonations")}
                    className="btn btn-primary rounded-pill w-100 text-dark fw-bold"
                    type="submit"
                  >
                    DONATE
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
