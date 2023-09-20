import { Link } from "react-router-dom";

const Chats = () => {
  return (
    <>
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/images/chats-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Chats</h1>
          </div>
        </div>
      </div>

      <div className="container p-md-5">
        <div className="bg-white rounded-4" style={{ minHeight: "30rem" }}>
          <div className="bg-gray rounded-4 p-2 mb-3">
            <h1>All Chats</h1>
          </div>
          <div className="container">
            <div className="row bg-info p-md-3 p-2 rounded-4 align-items-center mb-4">
              <div className="col-md-1">
                <div className="mb-md-0 mb-3 text-md-start text-center">
                  <img
                    src={require("../assets/icons/faq-icon.png")}
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="mb-md-0 mb-3">
                  <h3 className="text-md-start text-center">
                    Add Questions & Answers
                  </h3>
                </div>
              </div>
              <div className="col-md-2">
                <div className="mb-md-0 mb-3">
                  <Link
                    to="/admin-dashboard/add-faq"
                    className="btn btn-primary w-100"
                  >
                    <i className="fa-solid fa-plus me-1"></i>
                    Add FAQ
                  </Link>
                </div>
              </div>
            </div>
            <div className="row bg-info p-md-3 p-2 rounded-4 align-items-center mb-4">
              <div className="col-md-1">
                <div className="mb-md-0 mb-3 text-md-start text-center">
                  <img
                    src={require("../assets/images/chats-pg.png")}
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="mb-md-0 mb-3">
                  <h3 className="text-md-start text-center">
                    Message From NGOs
                  </h3>
                </div>
              </div>
              <div className="col-md-2">
                <div className="mb-md-0 mb-3">
                  <Link
                    to="/admin-dashboard/ngo-chats"
                    className="btn btn-primary w-100"
                  >
                    <i className="fa-solid fa-plus me-1"></i>
                    SEE ALL
                  </Link>
                </div>
              </div>
            </div>
            <div className="row bg-info p-md-3 p-2 rounded-4 align-items-center mb-4">
              <div className="col-md-1">
                <div className="mb-md-0 mb-3 text-md-start text-center">
                  <img
                    src={require("../assets/images/chats-pg.png")}
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="mb-md-0 mb-3">
                  <h3 className="text-md-start text-center">
                    Message From Volunteers
                  </h3>
                </div>
              </div>
              <div className="col-md-2">
                <div className="mb-md-0 mb-3">
                  <Link
                    to="/admin-dashboard/volunteer-chats"
                    className="btn btn-primary w-100"
                  >
                    <i className="fa-solid fa-plus me-1"></i>
                    SEE ALL
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
