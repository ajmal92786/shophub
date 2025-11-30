function CategoryCard({ categories }) {
  return (
    <>
      {categories.map((category) => (
        <div
          key={category._id}
          className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex"
          style={{ cursor: "pointer" }}
        >
          <div className="card border-0 w-100 h-100">
            <img
              src={category.thumbnail}
              class="card-img-top rounded object-fit-cover"
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
