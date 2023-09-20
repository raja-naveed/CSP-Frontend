import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BASEURL } from "../constants";
import { getNgoById } from "../constants";
import axios from "axios";

const PublicBankingDetails = () => {

  const location = useLocation();
  const [ngo, setNgo] = useState([]);
  const sort = new URLSearchParams(location.search).get('sort');

  useEffect(() => {
    getNgo();
  }, []);

  const getNgo = async () => {
    try {
      let url = BASEURL + getNgoById + sort;
      const responce = await axios.post(url);
      if (responce && responce.data) {
        setNgo(responce.data);
      }
    }
    catch (error) {
      console.log(error)
    }
  }
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

      {ngo && ngo.map((detail) => (
        <div className="col-md-6 col-11 mx-auto py-5">
          <div className="p-3 bg-white rounded-5 my-5">
            <div className="text-center bold mb-2">
              <h2>Bank Details</h2>
            </div>
            <p className="">Send amount to here:</p>
            <div className="row">
              <div className="col-4">
                <p>
                  <span className="fw-bold h5 text-secondary">
                    Account Title:{" "}
                  </span>
                </p>
              </div>
              <div className="col-8">
                <p className="text-muted">{detail.bankingDetails.title}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>
                  <span className="fw-bold h5 text-secondary">Account No: </span>
                </p>
              </div>
              <div className="col-8">
                <p className="text-muted">{detail.bankingDetails.accountnumber}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>
                  <span className="fw-bold h5 text-secondary">Branch Code: </span>
                </p>
              </div>
              <div className="col-8">
                <p className="text-muted">{detail.bankingDetails.branch}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>
                  <span className="fw-bold h5 text-secondary">Bank Name: </span>
                </p>
              </div>
              <div className="col-8">
                <p className="text-muted">{detail.bankingDetails.account}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>
                  <span className="fw-bold h5 text-secondary">IBAN No: </span>
                </p>
              </div>
              <div className="col-8">
                <p className="text-muted">{detail.bankingDetails.iban ? detail.bankingDetails.iban : "-----"}</p>
              </div>
              <div className="col-md-4 mx-auto">
                <div className="mt-3">
                  <Link
                    to="/publicSuccessful-payment"
                    className="btn btn-primary w-100"
                  >
                    Done
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PublicBankingDetails;
