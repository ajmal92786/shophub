import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useUserContext from "../contexts/UserContext";
import { FaUser } from "react-icons/fa";

function ProfilePage() {
  const [selectedType, setSelectedType] = useState("personal-information");
  const { userInfo } = useUserContext();
  //   console.log(userInfo);

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

              <div className="p-3 mt-2 bg-white fs-5 d-flex flex-column h-100">
                <button
                  className={`btn ${
                    selectedType === "personal-information"
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => setSelectedType("personal-information")}
                >
                  Personal Information
                </button>
                <button
                  className={`mt-3 btn ${
                    selectedType === "manage-addresses"
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => setSelectedType("manage-addresses")}
                >
                  Manage Addresses
                </button>
                <button
                  className={`mt-3 btn ${
                    selectedType === "order-history"
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => setSelectedType("order-history")}
                >
                  Order History
                </button>
              </div>
            </div>

            {selectedType === "personal-information" && (
              <div className="col-md-8">
                <div className="px-5 py-3 bg-white">
                  <h5>Personal Information</h5>
                  <section className="py-3">
                    <div className="d-flex flex-column">
                      <span className="text-muted">Name: </span>
                      <span className="fw-semibold">{userInfo?.name}</span>
                    </div>
                    <div className="d-flex flex-column py-3">
                      <span className="text-muted">Email: </span>
                      <span className="fw-semibold">{userInfo?.email}</span>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="text-muted">Phone: </span>
                      <span className="fw-semibold">{userInfo?.phone}</span>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {selectedType === "manage-addresses" && (
              <div className="col-md-8">Addresses</div>
            )}

            {selectedType === "order-history" && (
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
