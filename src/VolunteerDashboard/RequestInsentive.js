import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASEURL, moveTo, projectApis, reward } from "../constants";
import { message } from "antd";
import auth from "../services/authService";
import classnames from "classnames";
import { Rate } from 'antd';

const RequestInsentive = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayButton, setDisplayButton] = useState({
    certificate: false,
    points: false,
  });
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    userAuthAndDetails();
  }, []);

  function handleStarClick(starRating) {
    setRating(starRating);
  }
  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    setUser(userDetail);
  };

  async function handleRating() {
    try {
      const response = await axios.post(BASEURL + projectApis.rating, {
        projectId: location.state.id,
        starRating: rating,
      });
      if (response && response.data) {
        message.success("Rating Success");
      } else {
        message.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  }

    const requestIncentive = async (request) => {
    try {
      let data = {
        projectId: location.state.id,
        volId: user._id,
        ngoId: location.state.ngoId,
      };
      if (request === "certificate") {
        data = { ...data, certificateRequest: true };
        setDisplayButton({ ...displayButton, certificate: true });
      }
      if (request === "points") {
        data = { ...data, pointRequest: true };
        setDisplayButton({ ...displayButton, points: true });
      }
      const response = await axios.post(BASEURL + reward.rewardRequest, data);
      if (response && response.data) {
        message.success("Request Sent Success");
      } else {
        message.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/images/all-projects-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Your Projects</h1>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-11 mx-auto py-5">
        <div className="py-md-5 py-3 bg-white rounded-5 my-5">
          <p className="text-dark ms-2">Send one request or both!</p>
          <div className="bg-success p-3 rounded-3 mb-3">
            <div className="row">
              <div className="col-md-6">
                <h4>E-Certificate</h4>
              </div>
              <div className="col-md-4 ms-auto">
                <button
                  className="btn btn-primary w-100"
                  disabled={displayButton.certificate}
                  onClick={() => requestIncentive("certificate")}
                >
                  SEND REQUEST
                </button>
              </div>
            </div>
          </div>
          <div className="bg-success p-3 rounded-3 mb-5">
            <div className="row">
              <div className="col-md-6">
                <h4>CSP Hours (Points)</h4>
              </div>
              <div className="col-md-4 ms-auto">
                <button
                  className="btn btn-primary w-100"
                  disabled={displayButton.points}
                  onClick={() => requestIncentive("points")}
                >
                  SEND REQUEST
                </button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              // onClick={() => navigate("/volunteer-dashboard/all-projects")}
              type="button"
              class="btn btn-primary w-25"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Done
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content ">
                  <div class="modal-header border-0">
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <p className="text-center fw-bold">
                      How many stars would you like to give to this NGO?
                    </p>
                    <div className="text-center mb-3">
                      <small className="text-center text-secondary">
                        Tap a star to rate the NGO Project.
                      </small>
                    </div>
                    <div className="text-center">
                    <Rate allowClear onChange={handleStarClick} />
                      {/* <i class="fa-regular fa-star text-primary mx-1"></i>
                      <i class="fa-regular fa-star text-primary mx-1"></i>
                      <i class="fa-regular fa-star text-primary mx-1"></i>
                      <i class="fa-regular fa-star text-primary mx-1"></i>
                      <i class="fa-regular fa-star text-primary mx-1"></i> */}
                    </div>
                  </div>
                  <div
                    class="modal-footer border-0"
                    style={{ display: "unset" }}
                  >
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        navigate("/volunteer-dashboard/my-projects");
                      }}
                    >
                      Not Now
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                       onClick={() => {
                        handleRating();
                        window.location.replace("/volunteer-dashboard/my-projects");
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestInsentive;
