import { Link } from "react-router-dom";

const VolunteerChats = () => {
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
            <Link
              to="/admin-dashboard/chat"
              className="text-decoration-none text-dark"
            >
              <div className="row bg-info p-md-3 p-2 rounded-4 align-items-center mb-4">
                <div className="col-md-1">
                  <div className="mb-md-0 mb-2 text-md-start text-center">
                    <img
                      src={require("../assets/logos/alkhidmat-round-logo.png")}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="mb-md-0 mb-3">
                    <h3 className="text-md-start text-center">
                      Shahzaib Ahmed
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerChats;
