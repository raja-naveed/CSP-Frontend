import { Link, useLocation } from "react-router-dom";
import { BASEURL, ngo } from "../constants";
import { useRef, useState } from "react";
import { message } from "antd";
import axios from "axios";

const DonateAmount = () => {
  const location = useLocation();
  const linkedRef = useRef(null)
  const sort = new URLSearchParams(location.search).get('sort');
  const [amount, setAmount] = useState(null);
  const donateAmount = async (amounts) => {
    try {
      let data = { amount: amounts }
      if (data.amount) {
        let url = BASEURL + ngo.amountDonate  + sort;
        const responce = await axios.put(url, data);
        if (responce && responce.data && responce.status === 200) {
          message.info("Your amount has been recorded. Donate to below details");
          linkedRef.current.click();
        }
        else {
          message.error("Error")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (event) => {
    setAmount(event.target.value);
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

      <div className="col-md-6 col-11 mx-auto py-5">
        <div className="p-3 bg-white rounded-5 my-5">
          <p>Select amount:</p>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="row justify-content-evenly mb-3">
                <div className="col-4">
                  <div className="mb-3">
                    <button className="btn btn-primary p-4 w-100" value="50" onClick={(event)=> {setAmount(event.target.value) ; donateAmount(amount);} }>
                      50
                    </button>
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <button className="btn btn-primary p-4 w-100" value="500" onClick={(event)=>{setAmount(event.target.value) ; donateAmount(amount);}}>
                      500
                    </button>
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <button className="btn btn-primary p-4 w-100" value="1000" onClick={(event)=>{setAmount(event.target.value) ; donateAmount(amount);}}>
                      1000
                    </button>
                  </div>
                </div>
              </div>
              <div className="row g-0 justify-content-between align-items-center mb-3">
                <div className="col-5">
                  <hr />
                </div>
                <div className="col-2">
                  <div className="text-center">
                    <span className="fw-bold text-secondary">or</span>
                  </div>
                </div>
                <div className="col-5">
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-9 mx-auto">
                  <form action="" method="post">
                    <div className="mb-3">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control bg-light p-3"
                        placeholder="Enter amount manually"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="text-center">
                        <Link
                          to={{pathname:"/volunteer-dashboard/banking-details" , search :`?sort=${sort}`}}
                          className="btn btn-primary w-50"
                          onClick={() => donateAmount(amount)}
                          ref={linkedRef}
                        >
                          PROCEED
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonateAmount;
