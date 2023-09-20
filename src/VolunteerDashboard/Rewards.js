import { useEffect, useState } from "react";
import auth from "../services/authService";
import { BASEURL, reward } from "../constants";
import axios from "axios";
import { message } from "antd";
import moment from "moment";

const Rewards = () => {
  const [ rewards , setRewards ] = useState([]);
  const [user , setUser] = useState({});
  useEffect(() => {
    userAuthAndDetails();
  }, [])

  useEffect(() => {
    getProjects();;
  }, [user]);

  const userAuthAndDetails = async() =>{
    const userDetail = await auth.authUser();
    setUser(userDetail)
  }

  const getProjects = async () => {
    try {
      let data = { volId: user._id }
      let url = BASEURL + reward.getCertificate;
      let response = await axios.post(url, data);
      if (response && response.data) {
        setRewards(response.data)
      }
      else {
        message.error("Error occured.");
        message.info("Try again later");
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/images/awards-icon.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Rewards</h1>
          </div>
        </div>
      </div>

      <div className="container px-md-5">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="bg-light">
                <th className=" h4">#</th>
                <th className=" h4">Name</th>
                <th className=" h4">Category</th>
                <th className=" h4">Start Date</th>
                <th className=" h4">End Date</th>
                <th className="h4">Reward</th>
              </tr>
            </thead>

            <tbody>
              {rewards && rewards.map((project, index) => (
                <tr className="bg-info" key={index}>
                  <td className="h5">{index + 1}</td>
                  <td className="h5">{project.projectName}</td>
                  <td className="h5">{project.serviceCategory}</td>
                  <td className="h5">{moment(project.uploadDate).format("LL")}</td>
                  <td className="h5">{moment(project.endDate).format("LL")}</td>
                  <td className="h5">
                    <div class="dropdown">
                      <a download href={project.certificate} target="_blank"
                        class="btn btn-warning btn-sm dropdown-toggle"
                        type="button"
                        aria-expanded="false"
                      >
                        GET Reward
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Rewards;
