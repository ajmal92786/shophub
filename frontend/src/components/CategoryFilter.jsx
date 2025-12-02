function CategoryFilter() {
  return (
    <div className="pt-3">
      <label htmlFor="" className="fw-bold">
        Category
      </label>
      <br />
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="checkDefault"
        />
        <label className="form-check-label" htmlFor="checkDefault">
          Men
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="checkChecked"
          checked
        />
        <label className="form-check-label" htmlFor="checkChecked">
          Women
        </label>
      </div>
    </div>
  );
}

export default CategoryFilter;
