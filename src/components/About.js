import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { BASEURL, admin } from "../constants";
import { useEffect, useState } from "react";
import defaultImageAbout from "../assets/images/project-img.png";

const About = () => {
  const [about , setAbout] = useState([]);
  useEffect(()=>{
    getAbout();
  },[])

  const getAbout = async() =>{
    try {
      const response = await axios.get(BASEURL + admin.about);
      if(response && response.data){
        setAbout(response.data)
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
              {about && about.length > 0  ? about[0].description : "Mission Description"}
              </p>
            </div>
            <div className="col-md-6">
              <div className="mb-md-0 mb-3 text-center">
                <img
                  src={about && about.length > 0 && about[0].image !== "" ? about[0].image :  defaultImageAbout}
                  alt=""
                  width = "600rem"
                  className="img-fluid shadow rounded"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="pt-5">
        <Footer />
      </div>
    </>
  );
};

export default About;
