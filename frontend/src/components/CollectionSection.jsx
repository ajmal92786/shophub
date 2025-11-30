import manCollectionImage from "../assets/MenCollectionImage.png";
import womenCollectionImage from "../assets/WomenCollectionImage.png";

function CollectionSection() {
  return (
    <div className="row mt-3 g-3">
      <div
        className="col-12 col-md-6"
        style={{ height: "45vh", overflow: "hidden" }}
      >
        <img
          src={manCollectionImage}
          alt="Man Collection Banner"
          className="w-100 h-100"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
      <div
        className="col-12 col-md-6"
        style={{ height: "45vh", overflow: "hidden" }}
      >
        <img
          src={womenCollectionImage}
          alt="Woman Collection Banner"
          className="w-100 h-100"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
    </div>
  );
}

export default CollectionSection;
