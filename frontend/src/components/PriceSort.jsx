import useFilterContext from "../contexts/FilterContext";

function PriceSort() {
  const { sortBy, setSortBy } = useFilterContext();

  return (
    <div className="pt-3">
      <label className="fw-bold">Sort by</label>

      <div>
        <input
          type="radio"
          name="sortByPrice"
          id="sortLowToHigh"
          className="me-2"
          checked={sortBy === "lowToHigh"}
          onChange={() => setSortBy("lowToHigh")}
        />
        <label className="form-check-label" htmlFor="sortLowToHigh">
          Price - Low to High
        </label>
      </div>

      <div>
        <input
          type="radio"
          name="sortByPrice"
          id="sortHighToLow"
          className="me-2"
          checked={sortBy === "highToLow"}
          onChange={() => setSortBy("highToLow")}
        />
        <label htmlFor="sortHighToLow">Price - High to Low</label>
      </div>
    </div>
  );
}

export default PriceSort;
