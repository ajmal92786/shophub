import useCategoryContext from "../contexts/CategoryContext";
import CategoryCard from "./CategoryCard";

function FeaturedCategories() {
  const { categories, loading } = useCategoryContext();

  if (loading) return <p className="text-center py-5">Loading...</p>;

  return (
    <div className="row g-3 justify-content-center">
      <CategoryCard categories={categories || []} />
    </div>
  );
}

export default FeaturedCategories;
