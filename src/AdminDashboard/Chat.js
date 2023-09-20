import { Link } from "react-router-dom";

const Chat = () => {
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
            <h1 className="fw-bold text-white mb-0">Chat</h1>
          </div>
        </div>
      </div>

      <div className="container p-md-5">
        <div className="bg-white rounded-4 p-3">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link
                to="/admin-dashboard/ngo-chats"
                className="btn p-0 text-decoration-none text-dark"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Link>
              <button className="btn p-0">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            <section id="chat-header" className="border-bottom border-2">
              <div className="row mb-3">
                <div className="col-11 me-auto">
                  <div className="row g-2 align-items-center">
                    <div className="col-md-1 col-2">
                      <img
                        src={require("../assets/logos/alkhidmat-round-logo.png")}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="co-md-11 col-10">
                      <p className="mb-0">
                        <h4 className="mb-0">Alkhidmat Foundation</h4>
                        <small className="text-muted">
                          Online - Last seen, 2.02pm
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle border-0 p-0"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="my-1"
              id="chat-box"
              style={{ minHeight: "30rem" }}
            >
              <div className="row align-items-center g-2 mb-5">
                <div className="col-md-1 col-2">
                  <img
                    src={require("../assets/images/chat-dp.png")}
                    alt="alt-text"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-11 col-10">
                  <p className="mb-0">
                    Hi Edhi foundation, Let me know you need help and you can
                    ask us any questions.
                  </p>
                  <small className="text-secondary">08:20 AM</small>
                </div>
              </div>
            </section>

            <section id="chat-footer">
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
                    <button
                      className="btn bg-light rounded-end-pill"
                      type="button"
                    >
                      <i className="fa-regular fa-face-smile"></i>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
