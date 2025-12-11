import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useUserContext from "../contexts/UserContext";
import { FaUser } from "react-icons/fa";
import UserInformation from "../components/UserInformation";
import AddressList from "../components/AddressList";

function ProfilePage() {
  const [activeSection, setActiveSection] = useState("personal-information");
  const { userInfo } = useUserContext();

  return (
    <>
      <Header />
      <main className="bg-light py-5" style={{ minHeight: "85vh" }}>
        <div className="container">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="p-3 bg-white d-flex align-items-center gap-3">
                <div className="p-2 text-white bg-dark border rounded-circle">
                  <FaUser size={30} />
                </div>
                <div>
                  <div>Hello,</div>
                  <div className="fw-semibold">{userInfo?.name}</div>
                </div>
              </div>

              <div className="px-3 pt-4 pb-5 mt-2 bg-white fs-5 d-flex flex-column">
                <button
                  className={`btn ${
                    activeSection === "personal-information"
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => setActiveSection("personal-information")}
                >
                  Personal Information
                </button>
                <button
                  className={`mt-3 btn ${
                    activeSection === "manage-addresses"
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => setActiveSection("manage-addresses")}
                >
                  Manage Addresses
                </button>
                <button
                  className={`mt-3 btn ${
                    activeSection === "order-history"
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => setActiveSection("order-history")}
                >
                  Order History
                </button>
              </div>
            </div>

            {activeSection === "personal-information" && userInfo && (
              <div className="col-md-8">
                <UserInformation userInfo={userInfo} />
              </div>
            )}

            {activeSection === "manage-addresses" && userInfo && (
              <div className="col-md-8">
                <AddressList />
              </div>
            )}

            {activeSection === "order-history" && (
              <div className="col-md-8">Orders</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProfilePage;
