import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CategoryContext = createContext();

const useCategoryContext = () => useContext(CategoryContext);

export default useCategoryContext;

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/categories`);
      const json = await res.json();

      setCategories(json.data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  });

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
}
