import {  useNavigate } from "react-router-dom";
import CountUp from "react-countup";

import Header from "./Header";
import Footer from "./Footer";
import auth from "../services/authService";
import { useEffect, useState } from "react";
import { BASEURL, admin, projectApis } from "../constants";
import projectImg from "../assets/images/project-img.png";
import alkhidmat from "../assets/logos/alkhidmat.png";
import axios from "axios";
import slider from "../assets/images/flood.jpg";

const GuestUser = () => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    userAuthAndDetails();
    getProjects();
    getActiveNgo();
    getSlider();
  }, []);
  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    setUser(userDetail);
  };

  useEffect(() => {
    if (index > 2) {
      setIndex(0);
    }
    if (index < 0) {
      setIndex(2);
    }
  }, [index]);

  const getProjects = async () => {
    try {
      let url = BASEURL + projectApis.getAllAfterNow;
      let response = await axios.get(url);
      if (response && response.data) {
        setProjects(response.data);
      } else {
        console.log("not project found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveNgo = async () => {
    try {
      const response = await axios.get(BASEURL + admin.activeNgos);
      if (response && response.data) {
        setNgos(response.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSlider = async () => {
    try {
      const response = await axios.get(BASEURL + admin.getSlider);
      if (response && response.data) {
        setImages(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user || !user._id) {
    return (
      <>
        <Header />
        {/* hero section */}
        <section className="hero-section">
          {/* carousel */}

          <div
            id="carouselExampleCaptions position-relative"
            className="carousel slide"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={
                    images && images.length > 0 && images[index]
                      ? images[index]
                      : slider
                  }
                  className="d-block w-100 img-fluid opacity-75"
                  alt="..."
                />
                <div className="carousel-caption">
                  <h1 className="fa-5x hero__title">
                    “The best among you are those who bring the greatest benefit
                    to others”
                  </h1>
                </div>
              </div>
              {/* <div className="carousel-item">
                <img
                  src={require("../assets/images/flood.jpg")}
                  className="d-block w-100 img-fluid opacity-75"
                  alt="..."
                />
                <div className="carousel-caption">
                  <h1 className="fa-5x">
                    “The best among you are those who bring the greatest benefit
                    to others”
                  </h1>
                  <button className="btn btn-lg btn-primary rounded-pill">
                    DONATE NOW
                  </button>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src={require("../assets/images/flood.jpg")}
                  className="d-block w-100 img-fluid opacity-75"
                  alt="..."
                />
                <div className="carousel-caption">
                  <h1 className="fa-5x">
                    “The best among you are those who bring the greatest benefit
                    to others”
                  </h1>
                  <button className="btn btn-lg btn-primary rounded-pill">
                    DONATE NOW
                  </button>
                </div>
              </div> */}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
              onClick={() => setIndex(index - 1)}
            >
              <span
                className="carousel-control-prev-icon btn btn-primary rounded-circle"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
              onClick={() => setIndex(index + 1)}
            >
              <span
                className="carousel-control-next-icon btn btn-primary rounded-circle"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
            <div
              className="container d-md-block d-none position-absolute translate-middle start-50 hero-items"
              style={{ top: "105%" }}
            >
              <div className="text-end">
                <span className="bg-warning rounded-top p-2">
                  Fundraise target 50,000
                </span>
              </div>
              <div className="row g-0">
                <div className="col-md-4">
                  <div className="card rounded-0 border-0 p-3 bg-cyan">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <div className="text-md-start text-center">
                          <img
                            src={require("../assets/images/charity.png")}
                            alt=""
                            className="img-fluid"
                            style={{
                              maxWidth: "150px",
                              width: "100%",
                              height: "90px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="text-md-start text-center">
                          <p className="text-white fw-bold mb-0">
                            Money raised so far
                          </p>
                          <CountUp
                            className="text-warning fw-bold h3"
                            start={0}
                            end={14670}
                            duration={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card rounded-0 border-0 p-3 bg-primary">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <div className="text-md-start text-center">
                          <img
                            src={require("../assets/images/dollar.png")}
                            alt=""
                            className="img-fluid"
                            style={{
                              maxWidth: "150px",
                              width: "100%",
                              height: "90px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="text-md-start text-center">
                          <p className="text-white fw-bold mb-0">
                            People get aid
                          </p>
                          <CountUp
                            className="text-warning fw-bold h3"
                            start={0}
                            end={14670}
                            duration={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card rounded-0 border-0 p-3 bg-cyan">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <div className="text-md-start text-center">
                          <img
                            src={require("../assets/images/care.png")}
                            alt=""
                            className="img-fluid"
                            style={{
                              maxWidth: "150px",
                              width: "100%",
                              height: "90px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="text-md-start text-center">
                          <p className="text-white fw-bold mb-0">
                            People donated
                          </p>
                          <CountUp
                            className="text-warning fw-bold h3"
                            start={0}
                            end={14670}
                            duration={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container d-md-none d-block hero-items mt-3">
            <div className="text-end">
              <span className="bg-warning rounded-top p-2">
                Fundraise target 50,000
              </span>
            </div>
            <div className="row g-0">
              <div className="col-md-4">
                <div className="card rounded-0 border-0 p-3 bg-cyan">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <div className="text-md-start text-center">
                        <img
                          src={require("../assets/images/charity.png")}
                          alt=""
                          className="img-fluid"
                          style={{
                            maxWidth: "150px",
                            width: "100%",
                            height: "90px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="text-md-start text-center">
                        <p className="text-white fw-bold mb-0">
                          Money raised so far
                        </p>
                        <CountUp
                          className="text-warning fw-bold h3"
                          start={0}
                          end={14670}
                          duration={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card rounded-0 border-0 p-3 bg-primary">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <div className="text-md-start text-center">
                        <img
                          src={require("../assets/images/dollar.png")}
                          alt=""
                          className="img-fluid"
                          style={{
                            maxWidth: "150px",
                            width: "100%",
                            height: "90px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="text-md-start text-center">
                        <p className="text-white fw-bold mb-0">
                          People get aid
                        </p>
                        <CountUp
                          className="text-warning fw-bold h3"
                          start={0}
                          end={14670}
                          duration={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card rounded-0 border-0 p-3 bg-cyan">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <div className="text-md-start text-center">
                        <img
                          src={require("../assets/images/care.png")}
                          alt=""
                          className="img-fluid"
                          style={{
                            maxWidth: "150px",
                            width: "100%",
                            height: "90px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="text-md-start text-center">
                        <p className="text-white fw-bold mb-0">
                          People donated
                        </p>
                        <CountUp
                          className="text-warning fw-bold h3"
                          start={0}
                          end={14670}
                          duration={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* services */}
        <section className="services pt-5 mt-md-5" id="services">
          <div className="container-fluid my-5 pt-md-5">
            <div className="mb-5">
              <h1 className="text-center text-info fw-bold">SERVICES</h1>
              <p className="text-center text-light">
                The spirit of all religions is to serve humanity
              </p>
            </div>
            <div className="border rounded-4 p-md-5 p-3">
              <div className="row justify-content-evenly">
                <div className="col-md-3 col-sm-4 col-6">
                  <div className="text-center mb-md-5 mb-3">
                    <div className="mb-3">
                      <img
                        src={require("../assets/images/disaster.png")}
                        alt=""
                        className="img-fluid w-25"
                      />
                      <h4 className="text-white">Disaster Management</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4 col-6">
                  <div className="text-center mb-md-5 mb-3">
                    <div className="mb-3">
                      <img
                        src={require("../assets/images/healthcare.png")}
                        alt=""
                        className="img-fluid w-25"
                      />
                      <h4 className="text-white">Health Services</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4 col-6">
                  <div className="text-center mb-md-5 mb-3">
                    <div className="mb-3">
                      <img
                        src={require("../assets/images/education.png")}
                        alt=""
                        className="img-fluid w-25"
                      />
                      <h4 className="text-white">Free Education</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4 col-6">
                  <div className="text-center mb-md-5 mb-3">
                    <div className="mb-3">
                      <img
                        src={require("../assets/images/faucet.png")}
                        alt=""
                        className="img-fluid w-25"
                      />
                      <h4 className="text-white">Clean water</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4 col-6">
                  <div className="text-center mb-md-5 mb-3">
                    <div className="mb-3">
                      <img
                        src={require("../assets/images/orphan-care.png")}
                        alt=""
                        className="img-fluid w-25"
                      />
                      <h4 className="text-white">Orphan Care</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4 col-6">
                  <div className="text-center mb-md-5 mb-3">
                    <div className="mb-3">
                      <img
                        src={require("../assets/images/community.png")}
                        alt=""
                        className="img-fluid w-25"
                      />
                      <h4 className="text-white">Community Services</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4 col-6">
                  <div className="text-center mb-md-5 mb-3">
                    <div className="mb-3">
                      <img
                        src={require("../assets/images/trees.png")}
                        alt=""
                        className="img-fluid w-25"
                      />
                      <h4 className="text-white">Tree Plantation</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* projects */}
        <section className="my-5">
          <div className="mb-5">
            <h1 className="text-center text-info fw-bold">
              Active <span className="text-white">Projects</span>
            </h1>
            <p className="text-light text-center">
              These are currently ongoing project from different NGOs
            </p>
          </div>
          <div className="container-fluid">
            <div className="row g-1 justify-content-evenly">
              {projects &&
                projects.length > 0 &&
                projects.map((e, index) => (
                  <>
                    {index < 3}
                    <div className="col-md-3">
                      <div className="card mb-3">
                        <img
                          src={
                            e.projectCover && e.projectCover !== ""
                              ? e.projectCover
                              : projectImg
                          }
                          className="card-img-top"
                          alt="..."
                          width="20"
                          height="200"
                        />
                        <div className="card-body bg-success text-center">
                          <h5 className="card-title">{e.projectName}</h5>
                          <p className="card-text">{e.description}</p>
                          <div
                            onClick={() => navigate("/volunteer-register")}
                            className="btn btn-primary"
                          >
                            Voluneer
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
            <div className="text-center"></div>
          </div>
        </section>

        {/* ngo */}
        <section className="my-5 partners">
          <div className="mb-5">
            <h1 className="text-center text-info fw-bold">
              Partner <span className="text-white">NGOs</span>
            </h1>
            <p className="text-light text-center">
              These are all registered NGOs
            </p>
          </div>
          <div className="container-fluid">
            <div className="row g-1 justify-content-evenly">
              {ngos &&
                ngos.length > 0 &&
                ngos.map((n, index) => (
                  <>
                    {index < 6 ? (
                      <div className="col-md-3">
                        <div className="card mb-3 rounded-4">
                          <div className="card-body text-center">
                            <div className="text-center mb-3">
                              <img
                                src={
                                  n.profileImage && n.profileImage !== ""
                                    ? n.profileImage
                                    : alkhidmat
                                }
                                alt=""
                                className="img-fluid w-25 rounded-circle"
                              />
                            </div>
                            <h5 className="card-title">{n.ngoName}</h5>
                            <p className="card-text">{n.description}</p>
                            <div
                              onClick={() =>
                                navigate("/ngo-dashboard/ngo-profile", {
                                  state: { id: n._id },
                                })
                              }
                              className="btn btn-primary fw-bold text-white rounded-pill"
                            >
                              READ MORE
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ))}
            </div>
            {/* <div className="text-center">
              <button id="prev" type="button" className="btn mx-1">
                <i className="fa-solid fa-angle-left fs-3 fw-bold text-info"></i>
              </button>
              <button id="next" type="button" className="btn mx-1">
                <i className="fa-solid fa-angle-right fs-3 fw-bold"></i>
              </button>
            </div> */}
          </div>
        </section>

        <Footer />
      </>
    );
  } else {
    user && user.userType
      ? navigate("/" + user.userType + "-dashboard")
      : navigate("/");
  }
};

export default GuestUser;
