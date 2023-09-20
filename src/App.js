import { Routes, Route } from "react-router-dom";

// components
import GuestUser from "./components/GuestUser";
import NGODashboard from "./NGODashboard/NGODashboard";
import VolunteerDashboard from "./VolunteerDashboard/VolunteerDashboard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import About from "./components/About";
import Services from "./components/Services";
import Logins from "./components/Logins";
import JoinUs from "./components/JoinUs";
import Admin from "./components/LoginForms/Admin";
import NGO from "./components/LoginForms/NGO";
import Volunteer from "./components/LoginForms/Volunteer";
import RegisterNGO from "./components/RegisterationForms/NGO";
import VolunteerNGO from "./components/RegisterationForms/Volunteer";
// import Logout from "./components/Logout";
import PublicDonations from "./publicFolder/publicDonations";
import PublicDonateAmount from "./publicFolder/publicDonateAmount";
import PublicBankingDetails from "./publicFolder/publicBankingDetails";
import PublicSuccessfulPayment from "./publicFolder/publicSuccessfulPayment";
import axios from 'axios';


function App() {
  axios.defaults.withCredentials=true;
  let guestUser = "";
  return (
    <>
      <Routes>
        <Route path="/ngo-dashboard/*" element={<NGODashboard />} />
        <Route path="/volunteer-dashboard/*" element={<VolunteerDashboard />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="/" element={<GuestUser />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/logins" element={<Logins />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/admin-login" element={<Admin />} />
        <Route path="/ngo-login" element={<NGO />} />
        <Route path="/ngo-register" element={<RegisterNGO />} />
        <Route path="/volunteer-register" element={<VolunteerNGO />} />
        <Route path="/volunteer-login" element={<Volunteer />} />
        <Route path="/publicDonations" element={<PublicDonations />} />
        <Route path="/publicDonate-amount" element={<PublicDonateAmount />} />
        <Route path="/publicBanking-details" element={<PublicBankingDetails />} />
        <Route path="/publicSuccessful-payment" element={<PublicSuccessfulPayment />} />
      </Routes>
    </>
  );
}

export default App;
