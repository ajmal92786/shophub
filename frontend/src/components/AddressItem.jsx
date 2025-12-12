import useAddressContext from "../contexts/AddressContext";

function AddressItem({
  address,
  isSelected = false,
  onSelect = null,
  showDelete = false,
  onEdit = null,
}) {
  const { deleteAddress } = useAddressContext();

  return (
    <div
      className={`bg-white border p-3 mb-3 ${
        isSelected ? "border-success shadow" : ""
      }`}
      onClick={onSelect}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <span className="px-2 py-1 bg-body-secondary text-secondary fw-semibold">
          {address.addressType}
        </span>
        {showDelete && (
          <div>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => onEdit()}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteAddress(address._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="py-2 fw-semibold">
        <span className="me-3">{address.name}</span>
        <span>{address.phone}</span>
      </div>
      <div>
        <span>{address.addressLine}, </span>
        <span>{address.landmark}, </span>
        <span>{address.city}, </span>
        <span>{address.state} - </span>
        <span className="fw-semibold">{address.pincode}</span>
      </div>
    </div>
  );
}

export default AddressItem;
