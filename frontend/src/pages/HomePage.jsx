import Header from "../components/Header";
import Footer from "../components/Footer";
import FeaturedCategories from "../components/FeaturedCategories";
import HeroSection from "../components/HeroSection";
import CollectionSection from "../components/CollectionSection";

function HomePage() {
  return (
    <>
      <Header />
      <main className="container py-3">
        <FeaturedCategories />
        <HeroSection />
        <CollectionSection />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
