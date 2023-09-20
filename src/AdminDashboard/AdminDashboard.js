// components
import Header from "./Header";
import Navbar from "./Navbar";
import AdminIndex from "./AdminIndex";
import Customization from "./Customization";
import FAQ from "./FAQ";
import Chats from "./Chats";
import NGOChats from "./NGOChats";
import VolunteerChats from "./VolunteerChats";
import Chat from "./Chat";
import Volunteers from "./Volunteers";
import Requests from "./Requests";
import ViewNgoRequests from "./ViewNgoRequests";
import ViewVolunteerRequests from "./ViewVolunteerRequests";
import ProjectRequests from "./ProjectRequests";
import CSP from "./CSP";
import Grant from "./Grant";
import NGOs from "./NGOs";
import AllProjects from "./AllProjects";
import NGOProjects from "./NGOProjects";
import VolunteerProjects from "./VolunteerProjects";
import AddProjects from "./AddProject";
import NGOProfile from "../NGODashboard/NGOProfile";

import { Routes, Route, useLocation } from "react-router-dom";
// import { useState ,useEffect} from "react";
// import auth from "../services/authService";

const AdminDashboard = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <>
      <Header />
      <div className="container-fluid g-0" style={{ minHeight: "100dvh" }}>
        <div className="row g-0" style={{ minHeight: "100dvh" }}>
          {currentRoute !== "/admin-dashboard/ngo-profile" && (
            <div className="col-md-3 d-md-block d-none">
              <Navbar />
            </div>
          )}
          <Routes>
            <Route path="/ngo-profile" element={<NGOProfile />} />
          </Routes>

          <div className="col-md-9">
            <main className="">
              <Routes>
                <Route path="/" element={<AdminIndex />} />
                <Route path="/customization" element={<Customization />} />
                <Route path="/add-faq" element={<FAQ />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/ngo-chats" element={<NGOChats />} />
                <Route path="/volunteer-chats" element={<VolunteerChats />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/volunteers" element={<Volunteers />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/view-ngo-request" element={<ViewNgoRequests />} />
                <Route
                  path="/view-volunteer-request"
                  element={<ViewVolunteerRequests />}
                />
                <Route
                  path="/project-launch-request"
                  element={<ProjectRequests />}
                />
                <Route path="/csp-requests" element={<CSP />} />
                <Route path="/grant-points" element={<Grant />} />
                <Route path="/ngos" element={<NGOs />} />
                <Route path="/all-projects" element={<AllProjects />} />
                <Route path="/ngo-projects" element={<NGOProjects />} />
                <Route
                  path="/volunteer-projects"
                  element={<VolunteerProjects />}
                />
                <Route path="/add-projects" element={<AddProjects />} />
                <Route path="/csp-point-request" element={<CSP />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
