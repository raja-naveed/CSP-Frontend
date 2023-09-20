// components
import Header from "./Header";
import Navbar from "./Navbar";
import VolunteerIndex from "./VolunteerIndex";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import MyProjects from "./MyProjects";
import AllProjects from "./AllProjects";
import Success from "./Success";
import RequestInsentive from "./RequestInsentive";
import Donations from "./Donations";
import SelectProject from "./SelectProject";
import DonateAmount from "./DonateAmount";
import BankingDetails from "./BankingDetails";
import SuccessfulPayment from "./SuccessfulPayment";
import Support from "./Support";
import Chat from "./Chat";
import Rewards from "./Rewards";
import { Routes, Route ,useLocation} from "react-router-dom";

const VolunteerDashboard = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  return (
    <>
      <Header />
      <div className="container-fluid g-0" style={{ minHeight: "100dvh" }}>
        <div className="row g-0" style={{ minHeight: "100dvh" }}>
          <div className="col-md-3 d-md-block d-none">
            <Navbar />
          </div>

          <div className="col-md-9">
            <main className="">
              <Routes>
                <Route path="/" key={0} element={<VolunteerIndex />} />
                <Route path="/my-profile" key={1} element={<MyProfile />} />
                <Route path="/edit-profile" key={2} element={<EditProfile />} />
                <Route path="/my-projects" element={<MyProjects />} />
                <Route path="/all-projects" element={<AllProjects />} />
                <Route path="/success" element={<Success />} />
                <Route path="/request-insentive" element={<RequestInsentive />} />
                <Route path="/donations" element={<Donations />} />
                <Route path="/select-project" element={<SelectProject />} />
                <Route path="/donate-amount" element={<DonateAmount />} />
                <Route path="/banking-details" element={<BankingDetails />} />
                <Route path="/successful-payment" element={<SuccessfulPayment />} />
                <Route path="/support" element={<Support />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/rewards" element={<Rewards />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerDashboard;
