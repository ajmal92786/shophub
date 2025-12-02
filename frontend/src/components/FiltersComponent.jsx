import PriceSlider from "./PriceSlider";
import CategoryFilter from "../components/CategoryFilter";
import RatingFilter from "../components/RatingFilter";
import PriceSort from "../components/PriceSort";

function FiltersComponent() {
  return (
    <aside>
      <div className="d-flex justify-content-between">
        <div className="">
          <span className="fw-bold">Filters</span>
        </div>
        <div className="btn btn-sm btn-link">Clear</div>
      </div>
      <PriceSlider />
      <CategoryFilter />
      <RatingFilter />
      <PriceSort />
    </aside>
  );
}

export default FiltersComponent;
