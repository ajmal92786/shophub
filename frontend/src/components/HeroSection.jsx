import heroImage from "../assets/HeroSectionImage.png";

function HeroSection() {
  return (
    <div className="py-3">
      <div style={{ height: "70vh", overflow: "hidden" }}>
        <img
          src={heroImage}
          alt="Hero Banner"
          className="w-100 h-100"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
    </div>
  );
}

export default HeroSection;
