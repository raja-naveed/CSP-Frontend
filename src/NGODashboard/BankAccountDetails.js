import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
const BankAccountDetails = () => {
  const [user , setUser] = useState({});
  useEffect(() => {
    userAuthAndDetails();
  }, [])

  const userAuthAndDetails = async() =>{
    const userDetail = await auth.authUser();
    setUser(userDetail)
  }
  return (
    <>
      <>
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
              <h1 className="fw-bold text-white mb-0">
                Banking Details of {user.ngoName}
              </h1>
            </div>
          </div>
        </div>

        <div className="container px-md-5">
          <div className="row mb-3">
            <div className="col-md-2 ms-auto">
              <Link
                to="/ngo-dashboard/edit-bank-details"
                className="btn btn-primary w-100"
              >
                EDIT
              </Link>
            </div>
          </div>
          {/* Account Section */}
          <div className="row g-0 mb-3">
            <div className="col-md-3">
              <div className="border border-2 p-2 h-100">
                <p className="fw-bold text-white text-capitalize mb-0">
                  Account
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <div className="border border-2 p-2 h-100">
                {user.bankingDetails &&
                  user.bankingDetails.account ? (
                  <p className="text-white text-uppercase mb-0">
                    {user.bankingDetails.account}
                  </p>
                ) : (
                  <p className="text-white text-uppercase mb-0">
                    Not Provided
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Title Section */}
          <div className="row g-0 mb-3">
            <div className="col-md-3">
              <div className="border border-2 p-2 h-100">
                <p className="fw-bold text-white text-capitalize mb-0">
                  Title
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <div className="border border-2 p-2 h-100">
                {user.bankingDetails &&
                  user.bankingDetails.title ? (
                  <p className="text-white text-uppercase mb-0">
                    {user.bankingDetails.title}
                  </p>
                ) : (
                  <p className="text-white text-uppercase mb-0">
                    Not Provided
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Account Number Section */}
          <div className="row g-0 mb-3">
            <div className="col-md-3">
              <div className="border border-2 p-2 h-100">
                <p className="fw-bold text-white text-capitalize mb-0">
                  Account Number
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <div className="border border-2 p-2 h-100">
                {user.bankingDetails &&
                  user.bankingDetails.accountnumber ? (
                  <p className="text-white text-uppercase mb-0">
                    {user.bankingDetails.accountnumber}
                  </p>
                ) : (
                  <p className="text-white text-uppercase mb-0">
                    Not Provided
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Account Section */}
          <div className="row g-0 mb-3">
            <div className="col-md-3">
              <div className="border border-2 p-2 h-100">
                <p className="fw-bold text-white text-capitalize mb-0">
                  Branch
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <div className="border border-2 p-2 h-100">
                {user.bankingDetails &&
                  user.bankingDetails.branch ? (
                  <p className="text-white text-uppercase mb-0">
                    {user.bankingDetails.branch}
                  </p>
                ) : (
                  <p className="text-white text-uppercase mb-0">
                    Not Provided
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Account Section */}
          <div className="row g-0 mb-3">
            <div className="col-md-3">
              <div className="border border-2 p-2 h-100">
                <p className="fw-bold text-white text-capitalize mb-0">
                  Phone
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <div className="border border-2 p-2 h-100">
                {user.bankingDetails &&
                  user.bankingDetails.phone ? (
                  <p className="text-white text-uppercase mb-0">
                    {user.bankingDetails.phone}
                  </p>
                ) : (
                  <p className="text-white text-uppercase mb-0">
                    Not Provided
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* IBAN */}
          <div className="row g-0 mb-3">
            <div className="col-md-3">
              <div className="border border-2 p-2 h-100">
                <p className="fw-bold text-white text-capitalize mb-0">
                  IBAN
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <div className="border border-2 p-2 h-100">
                {user.bankingDetails &&
                  user.bankingDetails.iban ? (
                  <p className="text-white text-uppercase mb-0">
                    {user.bankingDetails.iban}
                  </p>
                ) : (
                  <p className="text-white text-uppercase mb-0">
                    Not Provided
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default BankAccountDetails;
