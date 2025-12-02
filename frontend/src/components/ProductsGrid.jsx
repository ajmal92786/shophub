import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductCard from "./ProductCard";

function ProductsGrid() {
  const paramsObj = useParams();
  const { data, loading, error } = useFetch("/api/products");

  const filteredProducts = data?.data?.products.filter(
    (product) => product.category.name === paramsObj.category
  );

  if (error) {
    return <p className="text-danger text-center">Something went wrong!</p>;
  }

  return (
    <div className="">
      <div className="py-3">
        <span className="fw-bold">Showing All Products</span>{" "}
        <span>{`(Showing ${filteredProducts?.length} products)`}</span>
      </div>
      {loading && <p>Products loading...</p>}
      {!loading && data?.data?.products?.length === 0 && (
        <p>No products found.</p>
      )}
      {data && data?.data?.products?.length > 0 && (
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-4 mb-3" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsGrid;
