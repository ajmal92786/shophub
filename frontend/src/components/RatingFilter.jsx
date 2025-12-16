import useFilterContext from "../contexts/FilterContext";

function RatingFilter() {
  const { selectedRating, setSelectedRating } = useFilterContext();

  const handleRatingChange = (event) => {
    setSelectedRating(Number(event.target.value));
  };

  return (
    <div className="pt-3">
      <label className="fw-bold">Rating</label>

      <div className="pt-1">
        {[4, 3, 2, 1].map((rating) => (
          <div className="" key={rating}>
            <input
              type="radio"
              name="ratingFilter"
              id={`ratingFilter-${rating}`}
              className="me-2"
              value={rating}
              checked={selectedRating === rating}
              onChange={handleRatingChange}
            />
            <label htmlFor={`ratingFilter-${rating}`}>
              {rating} Stars & above
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingFilter;
