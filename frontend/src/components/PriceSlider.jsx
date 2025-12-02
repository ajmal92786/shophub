import { useState } from "react";

function PriceSlider() {
  const [selectedPrice, setSelectedPrice] = useState(1650);
  console.log(selectedPrice);

  return (
    <div>
      <label htmlFor="priceRangeSelector" className="fw-bold">
        Price
      </label>

      <div className="pt-2">
        <input
          type="range"
          id="priceRangeSelector"
          className="w-100"
          min={500}
          max={3000}
          step={100}
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(Number(e.target.value))}
        />

        <div className="d-flex justify-content-between text-secondary">
          <span>300</span>
          <span>1500</span>
          <span>3000</span>
        </div>
      </div>
    </div>
  );
}

export default PriceSlider;
