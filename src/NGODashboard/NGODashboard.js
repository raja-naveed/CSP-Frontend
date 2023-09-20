// components
import Header from "./Header";
import Navbar from "./Navbar";
import NGOIndex from "./NGOIndex";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import Volunteers from "./Volunteers";
import AllProjects from "./AllProjects";
import EditBankDetails from "./EditBankDetails";
import BankAccountDetails from "./BankAccountDetails";
import AddProject from "./AddProject";
import Awards from "./Awards";
import Support from "./Support";
import ChatWithAdmin from "./ChatWithAdmin";
import NGOProfile from "./NGOProfile";

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import auth from "../services/authService";

const NGODashboard = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [isLoggedIn, setLoggedIn] = useState([]);

  useEffect(()=>{
    userAuthAndDetails();
  },[])

  const userAuthAndDetails = async() =>{
    const userDetail = await auth.authUser();
    setLoggedIn(userDetail)
  }
    return (
      <>
        <Header />
        <div className="container-fluid g-0" style={{ minHeight: "100dvh" }}>
          <div className="row g-0" style={{ minHeight: "100dvh" }}>
            {currentRoute !== "/ngo-dashboard/ngo-profile" && (
              <div className="col-md-3 d-md-block d-none">
                <Navbar />
              </div>
            )}

            <Routes>
              <Route key={9} path="/ngo-profile" element={<NGOProfile/>} />
            </Routes>

            <div className="col-md-9">
              <main className="">
                <Routes>
                  <Route path="/" key={10} element={<NGOIndex/>} />
                  <Route path="/my-profile" key={11} element={<MyProfile/>} />
                  <Route path="/all-projects" key={12} element={<AllProjects/>} />
                  <Route path="/add-project" key={13} element={<AddProject  />} />
                  <Route path="/edit-profile" key={14} element={<EditProfile editProfile = {isLoggedIn}  />} />
                  <Route path="/volunteers" key={15} element={<Volunteers />} />
                  <Route path="/bank-account-details" key={16} element={<BankAccountDetails bankdetail = {isLoggedIn} />} />
                  <Route path="/edit-bank-details" key={17} element={<EditBankDetails editbankdetail = {isLoggedIn}    />} />
                  <Route path="/awards" key={18} element={<Awards/>} />
                  <Route path="/support" key={19} element={<Support />} />
                  <Route path="/chat-with-admin" key={20} element={<ChatWithAdmin />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }

export default NGODashboard;
