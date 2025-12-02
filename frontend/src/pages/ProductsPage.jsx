import FiltersComponent from "../components/FiltersComponent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsGrid from "../components/ProductsGrid";

function ProductsPage() {
  return (
    <>
      <Header />
      <main className="bg-light">
        <div className="container py-3">
          <div className="row">
            <div className="py-1 col-3 bg-white rounded">
              <FiltersComponent />
            </div>
            <div className="col-9 rounded">
              <ProductsGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductsPage;
