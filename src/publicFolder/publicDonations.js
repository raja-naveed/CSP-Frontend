import { Link } from "react-router-dom";
import { BASEURL, ngo } from "../constants";
import axios from "axios";
import { useEffect, useState } from "react";

const PublicDonations = () => {

  const [ngos, setNgos] = useState([]);
  function handleDetails(event) {
    const button = event.target.closest("button");
  if (button) {
    const details = document.getElementById(button.value);
    if (details) {
      details.classList.toggle("d-none");
    }
  }
  }
 

  useEffect(() => {
    getNgos();
  }, [])

  const getNgos = async () => {
    try {
      let url = BASEURL + ngo.getAll;
      const responce = await axios.get(url);
      if (responce && responce.data) {
        setNgos(responce.data);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const sumItems = (items) => {
    let sum = 0;
    items.map((item) => {
      sum += item.amount;
    })
    return sum;
  };

  const countItems = (items) => {
    let count = 0;
    items.map((item) => {
      if(item._id)
      {
        count += 1 
    };
    })
    return count;
  };

  return (
    <>
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/images/donation-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Donations</h1>
          </div>
        </div>
      </div>

      <div className="container p-md-4">
        <div className="bg-white rounded-5">
          <div className="bg-gray rounded-4 p-2 mb-3">
            <h1>Registered NGO’s</h1>
          </div>
          {ngos && ngos.length > 0 && ngos.map((ngo, index) => (
            <div key={index + 1} className="bg-success rounded-4 p-2 mb-3">
              <div className="row align-items-center">
                <div className="col-md-1">
                  <div className="text-center">
                    <img
                      src={require("../assets/images/foundation.png")}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="text-md-start text-center">
                    <h2 className="mb-0 fw-bold">{ngo.ngoName}</h2>
                    <p>Donate for kids to their well being, and serve humanity</p>
                  </div>
                </div>
                <div className="col-md-3 col-10">
                  <Link
                    to={{pathname:"/publicDonate-amount" , search :`?sort=${ngo._id}`}}
                    className="btn btn-primary w-100"
                  >
                    Donate Now
                  </Link>
                </div>
                <div className="col-1">
                  <div className="">
                    <button className="btn" value={index} type="button" onClick={handleDetails}>
                      <i class="fa-solid fa-angle-down"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="details" id={index}>
              
              <h3 className="text-center">About {ngo.ngoName}</h3>
                <p>
                  {ngo.description}
            
                </p>

                <div className="row align-items-center">
                  <div className="col-6">
                    <p>{ngo.bankingDetails.donations ? countItems(ngo.bankingDetails.donations) : 0 } People's Donated</p>
                  </div>
                  <div className="col-6">
                    <div className="text-end">
                      <p className="text-secondary mb-0">Total Donation</p>
                      <p className="fw-bold">{ngo.bankingDetails.donations ? sumItems(ngo.bankingDetails.donations) : 0}PKR</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PublicDonations;
