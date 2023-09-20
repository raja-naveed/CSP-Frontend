import { Link } from "react-router-dom";
import userIcon from "../assets/images/userIcon.png";
import { useEffect, useState } from "react";
import auth from "../services/authService";
const MyProfile = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    userAuthAndDetails();
  }, [])

  const userAuthAndDetails = async () => {
    const userDetail = await auth.authUser();
    setUser({
      name: userDetail.fullname,
      email: userDetail.email,
      phone: userDetail.phone,
      cnic: userDetail.cnic,
      institution: userDetail.institution,
      address: userDetail.address,
    })
  }

  return (
    <>
      {/*Profile Information Heading*/}
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/images/profile-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Profile Information</h1>
          </div>
        </div>
      </div>


      <div className="container px-md-5">

        {/*Edit Profile Button */}
        <div className="col-md-2 ms-auto">
          <div className="mb-md-5 mb-3">
            <Link
              to="/volunteer-dashboard/edit-profile"
              className="btn btn-primary w-100"
            >
              EDIT
            </Link>
          </div>
        </div>


        {Object.keys(user).map((key) => (
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <p className="fw-bold text-white text-capitalize mb-0">
                {key === "cnic" ? key.toUpperCase() : key}
              </p>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <p className="form-control" >{user[key]}</p>

              </div>
            </div>
          </div>
        ))}

        <div className="row align-items-center mb-4">
          <div className="col-md-4">
            <p className="fw-bold text-white mb-0">Profile Image</p>
          </div>
          <div className="col-md-8">
            <p className="text-md-start text-center mb-0">
              <a className="btn btn-warning w-25" download href={user.profileImage ? user.profileImage : userIcon}>
                View
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
