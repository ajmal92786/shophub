import Footer from "../components/Footer";
import Header from "../components/Header";

function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="bg-light py-5" style={{ minHeight: "85vh" }}>
        <div className="container">
          <section>
            <h5>Select a delivery address</h5>
            <div></div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CheckoutPage;
