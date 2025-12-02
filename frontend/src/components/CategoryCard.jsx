import { useNavigate } from "react-router-dom";

function CategoryCard({ categories }) {
  const navigate = useNavigate();

  return (
    <>
      {categories.map((category) => (
        <div
          key={category._id}
          className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex"
        >
          <div
            className="card border-0 w-100 h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/products/${category.name}`)}
          >
            <img
              src={category.thumbnail}
              className="card-img-top rounded object-fit-cover"
              alt={`${category.name} category`}
              style={{ height: "110px" }}
            />
            <div className="card-body p-0 text-center">
              <h6 className="mb-0 fw-semibold">{category.name}</h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CategoryCard;
