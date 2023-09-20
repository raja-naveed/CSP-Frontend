import { Link } from "react-router-dom";

const ChatWithAdmin = () => {
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
        <div className="bg-white p-3 rounded-3">
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

          <section
            className="chat-system p-md-4"
            style={{
              height: "25rem",
              //   overflowY: "scroll",
            }}
          >
            <div className="row mb-5">
              <div className="col-12">
                <p className="position-relative bg-light rounded-3 ps-5 p-3 mb-0 w-75">
                  Hi Edhi foundation, Let me know you need help and you can ask
                  us any questions.
                  <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill chat-dp">
                    <img
                      src={require("../assets/images/chat-dp.png")}
                      alt="alt-text"
                      className="img-fluid w-75"
                    />
                  </span>
                </p>
                <small className="text-secondary">08:20 AM</small>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-12">
                <div className="d-flex justify-content-end">
                  <p className="bg-danger bg-opacity-25 rounded-3 ps-5 p-3 mb-0 w-75 text-danger">
                    Hi Edhi foundation, Let me know you need help and you can
                    ask us any questions.
                  </p>
                </div>
                <div className="text-end">
                  <small className="text-secondary">08:20 AM</small>
                </div>
              </div>
            </div>
          </section>
          <div className="row align-items-center">
            <div className="col-md-1 col-2">
              <button className="btn p-0">
                <i className="fa-solid fa-camera fs-3"></i>
              </button>
            </div>
            <div className="col-md-11 col-10">
              <div className="input-group border rounded">
                <input
                  type="text"
                  className="form-control border-0 bg-light rounded-start-pill"
                  placeholder="Write a comment"
                />
                <button className="btn bg-light rounded-end-pill" type="button">
                  <i className="fa-regular fa-face-smile"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWithAdmin;
