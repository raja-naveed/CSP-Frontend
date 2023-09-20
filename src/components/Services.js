// import { Link } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL, admin, ngo } from "../constants";
import defaultImageAbout from "../assets/images/project-img.png";
import { message } from "antd";

const Services = () => {
  const [about, setAbout] = useState([]);
  const [serviceCategory, setServiceCategory] = useState({});
  useEffect(() => {
    getAbout();
    getServiceCategory();
  }, [])

  const getAbout = async () => {
    try {
      const response = await axios.get(BASEURL + admin.about);
      if (response && response.data) {
        setAbout(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getServiceCategory = async () => {
    try {
      const response = await axios.get(BASEURL + ngo.serviceCategory);
      if (response && response.data) {
        setServiceCategory(response.data.data)
      }
      else {
        message.error("Error in fetching category");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />

      <div className="container">
        <section className="py-md-5">
          <div className="row flex-md-row flex-column-reverse align-items-center">
            <div className="col-md-6">
              <h1 className="display-5 text-light fw-bold mb-3">
                {about && about.length > 0 ? about[0].mission : "Mission"}
              </h1>
              <p className="lead text-light mb-md-5">
                {about && about.length > 0 ? about[0].description : "Mission Description"}
              </p>
            </div>
            <div className="col-md-6">
              <div className="mb-md-0 mb-3 text-center">
                <img
                  src={about && about.length > 0 && about[0].image !== "" ? about[0].image : defaultImageAbout}
                  alt=""
                  width="600rem"
                  className="img-fluid shadow rounded"
                />
              </div>
            </div>
          </div>
        </section>

        <main className="pb-5">
          <h1 className="text-white text-center mb-5">Services</h1>
          <div className="row justify-content-evenly">
            <div className="col-md-3">
              {serviceCategory && serviceCategory.length > 0 && serviceCategory.map((e,index) => (
                <div key={index} class="card mb-3">
                  <h5 class="card-header text-center">Category</h5>
                  <div class="card-body"> 
                    <p class="card-text text-center">
                      {e}
                    </p>
                  </div>
                  <div className="card-footer text-center">
                    <span class="badge rounded-pill text-bg-secondary mx-1">
                      tag
                    </span>
                    <span class="badge rounded-pill text-bg-secondary mx-1">
                      tag
                    </span>
                    <span class="badge rounded-pill text-bg-secondary mx-1">
                      tag
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
};

export default Services;
