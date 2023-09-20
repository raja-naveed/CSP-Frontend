import { useEffect, useState } from "react";
import { BASEURL, getNgoById, projectApis } from "../constants";
import userIcon from "../assets/images/userIcon.png";
import { Rate, message } from "antd";
import axios from "axios";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { useLocation } from "react-router-dom";
import auth from "../services/authService";
const NGOProfile = () => {
  const [projects, setProjects] = useState([]);
  const [ngo, setNgo] = useState([]);
  const location = useLocation();
  const [user, setUser] = useState({})
  const [rating ,setRating] = useState(null);
  useEffect(() => {
    userAuthAndDetails();
  }, [])

  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    if (userDetail && userDetail.ngoName) {
      setUser(userDetail);
      getCurrentNgo(userDetail._id);
      getProjects(userDetail._id);
      getRating(userDetail._id);
    }
    else {
      let id = location.state && location.state.id ? location.state.id : console.log("location.state.id", location.state.id);
      if (id) {
        getCurrentNgo(id);
        getProjects(id);
        getRating(id);
      }
    }
  }
  const calculateRating = (ratings)=>{
    let fiveRating = null;
    let fourRating = null;
    let threeRating = null;
    let twoRating = null;
    let oneRating = null;
    let totalRating = 0;
    let totalResponces = 0;

    ratings.map((rating)=>{
        if(rating.starRating == 5){
          fiveRating += 5;
        } 
        if(rating.starRating == 4){
          fourRating += 4;
        }
        if(rating.starRating == 3){
          threeRating += 3;
        }
        if(rating.starRating == 2){
          twoRating += 2 ;
        }
        if(rating.starRating == 1){
          oneRating += 1;
        }
        totalResponces +=1;
    })
    totalRating = fiveRating + fourRating + threeRating + twoRating + oneRating;
    return totalRating/totalResponces;

  }
  const getRating = async (id) => {
    try {
      let url = BASEURL + projectApis.getRating;
      let data = {
        ngoId: id
      }
      let res = await axios.post(url, data);
      if (res && res.data && res.data.data) {
        let overAllRating = calculateRating(res.data.data);
        setRating(overAllRating);
      }
      else {
        message.error(res.data.message);
      }
    }
    catch (error) {
      console.log("Error")
    }
  }
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
  const getProjects = async (id) => {
    try {
      let url = BASEURL + projectApis.getProjectsByNgoId;
      let data = {
        ngoId : id
      }
      let res = await axios.post(BASEURL + projectApis.getProjectsByNgoId, data) 
      if (res && res.data) {
        setProjects(res.data)
      }
      else {
        //message.info("No Active Projects found");
      }
    }
    catch (error) {
      message.error("Error")
    }
  }
  const getCurrentNgo = async (id) => {
    try {
      let url = BASEURL + getNgoById + id;
      const responce = await axios.post(url);
      if (responce && responce.data != null) {
        console.log(responce)
        setNgo(responce.data[0]);
      }
      else {
        console.log("Ngo not found")
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container-fluid px-0 mb-5">
        <div className="col-12">
          <div className="mb-5">
            <div className="position-relative">
              {ngo && ngo.coverImage && (
                <>
                  <img
                    src={ngo.coverImage ? ngo.coverImage : userIcon}
                    alt="alt-text"
                    style={{ width: '300rem', height: '600px' }}
                    className="img-fluid"
                  />
                </>
              )}
              <div
                className="position-absolute translate-middle ngo__pp"
                style={{
                  top: "100%",
                  left: "10%",
                }}
              >
                <div className="text-center">
                  {ngo && ngo.profileImage && (
                    <>
                      <img
                        src={ngo.profileImage ? ngo.profileImage : userIcon}
                        alt="alt-text"
                        style={{ width: '100rem', height: '150px' }}
                        className="img-fluid w-75"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 mx-auto">
          <div className="text-md-start text-center">
            <h1 className="text-white">{ngo && ngo.ngoName ? ngo.ngoName : "NGO"}</h1>
            <p className="mb-0 ">
            <Rate disabled value={rating && rating} character={({ index }) => customIcons[index + 1]} />
              <span className="text-white fw-bold">{rating && rating.toFixed(1)} out of 5</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container px-md-5">
        <h2 className="text-center text-white fw-bold mb-5">
          <span className="text-info">ONGOING</span> PROJECTS
        </h2>

        <div className="row mb-5 justify-content-evenly">
          {projects && projects.map((project, index) =>
            <div className="col-md-3" key={index + 1}>
              <div className="mb-3">
                <div className="card border-0 rounded-top-5 rounded-bottom-5">
                  <img
                    src={project.projectCover}
                    alt="alt-text"
                    className="img-fluid rounded-top-5"
                  />
                  <div className="bg-info p-3 text-center rounded-bottom-5">
                    <h2 className="text-white">{project.projectName}</h2>
                    <p className="text-white">
                      {project.description}
                    </p>
                    <button className="btn btn-primary rounded-pill w-75">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="row px-md-5">
          <div className="col-md-6"> {/* Increase the width to 4 columns */}
            <div className="mb-3">
              <h2 className="text-info">About {ngo.ngoName}</h2>
              <p className="text" style={{ width: '100%' }}> {/* Set the width to 100% */}
                {ngo.description ? ngo.description : "No Description"}
              </p>
              <div className="d-flex justify-content-evenly">
  <a href="" className="text-decoration-none text" style={{ color: 'darkblue' }}>
    <i className="fa-brands fa-square-facebook fs-3"></i>
  </a>
  <a href="" className="text-decoration-none text" style={{ color: 'magenta' }}>
    <i className="fa-brands fa-square-instagram fs-3"></i>
  </a>
  <a href="" className="text-decoration-none text" style={{ color: 'lightblue' }}>
    <i className="fa-brands fa-square-twitter fs-3"></i>
  </a>
  <a href="" className="text-decoration-none text" style={{ color: 'blue' }}>
    <i className="fa-brands fa-linkedin fs-3"></i>
  </a>
</div>

            </div>
          </div>
          <div className="col-md-4 offset-md-2"> {/* Increase the width to 4 columns and add offset */}
  <div className="mb-3">
    <h2 className="text-info">Contact Details</h2>
    <ul className="list-group">
      <li className="list-group-item bg-transparent border-0">
        <a href="" className="text-decoration-none text" style={{ color: 'black' }}>
          <i className="fa-solid fa-envelope"></i> alkhidmat123@gmail.com
        </a>
      </li>
      <li className="list-group-item bg-transparent border-0">
        <a href="" className="text-decoration-none text" style={{ color: 'black' }}>
          <i className="fa-solid fa-location-dot"></i> xyz, ABC
        </a>
      </li>
      <li className="list-group-item bg-transparent border-0">
        <a href="" className="text-decoration-none text" style={{ color: 'black' }}>
          <i className="fa-solid fa-phone"></i>{ngo.phone}
        </a>
      </li>
    </ul>
  </div>
</div>

        </div>
      </div>
    </>
  );
};

export default NGOProfile;
