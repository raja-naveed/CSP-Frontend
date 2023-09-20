import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="mb-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <h2 className="text-white">ALFAWZ</h2>
                <p className="text-white">
                ALFAWZ explains about a concept of developing a nonprofit
                  website for NGOs/charity organizations. It will bring together
                  these organizations and volunteers for effective community
                  service.
                </p>
                <p className="text-center">
                  <a
                    href="#"
                    className="text-decoration-none text-light mx-2"
                    target="_blank"
                  >
                    <i className="fa-brands fa-facebook fs-2"></i>
                  </a>
                  <a
                    href="#"
                    className="text-decoration-none text-light mx-2"
                    target="_blank"
                  >
                    <i className="fa-brands fa-twitter fs-2"></i>
                  </a>
                  <a
                    href="#"
                    className="text-decoration-none text-light mx-2"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin  fs-2"></i>
                  </a>
                  <a
                    href="#"
                    className="text-decoration-none text-light mx-2"
                    target="_blank"
                  >
                    <i className="fa-brands fa-instagram fs-2"></i>
                  </a>
                </p>
              </div>
            </div>

            <div className="col-md-2">
              <h3 className="text-white">Pages</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="join-us" className="text-decoration-none text-white">
                    Join Us
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="/#services" className="text-decoration-none text-white">
                    Services
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="about" className="text-decoration-none text-white">
                    About Us
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="logins" className="text-decoration-none text-white">
                    Sign in
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="publicDonations" className="text-decoration-none text-white">
                    Donate
                  </Link>
                </li>
              </ul>
            </div>

            <div id="services-section" className="col-md-2">
              <h3 className="text-white">Services</h3>
              <ul className="list-group list-group-flush">
                <li id="disaster-services" className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="#" className="text-decoration-none text-white">
                    Disaster Management
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="#" className="text-decoration-none text-white">
                    Health Services
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="#" className="text-decoration-none text-white">
                    Free Education
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="#" className="text-decoration-none text-white">
                    Clean Water
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="#" className="text-decoration-none text-white">
                    Orphan Care
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="#" className="text-decoration-none text-white">
                    Community Services
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 px-0 pb-0">
                  <Link to="#" className="text-decoration-none text-white">
                    Tree Plantation
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <div className="mb-3">
                <h3 className="text-white">Maps Location</h3>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.743209180338!2d73.02663591454548!3d33.715593042844326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbef8c137888d%3A0xc3ccfd031ad14ba6!2sBahria%20University!5e0!3m2!1sen!2s!4v1681140235637!5m2!1sen!2s"
                className="w-100"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title=""
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
