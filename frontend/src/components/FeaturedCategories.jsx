import useFetch from "../hooks/useFetch";
import CategoryCard from "./CategoryCard";

function FeaturedCategories() {
  const { data, loading, error } = useFetch("/api/categories");

  if (loading) return <p className="text-center py-5">Loading...</p>;
  if (error)
    return <p className="text-danger text-center">Something went wrong!</p>;

  return (
    <div className="row g-3 justify-content-center">
      <CategoryCard categories={data?.data?.categories || []} />
    </div>
  );
}

export default FeaturedCategories;
