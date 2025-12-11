import { useState } from "react";
import useAddressContext from "../contexts/AddressContext";

function AddAddress({ setIsAddingAddress }) {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    addressType: "",
  });

  const { addAddress } = useAddressContext();

  const handleAddressSubmit = (event) => {
    event.preventDefault();

    if (address.phone.length !== 10) {
      alert("Phone number must be 10 digits.");
      return;
    }

    if (address.pincode.length !== 6) {
      alert("Pincode must be 6 digits.");
      return;
    }

    // console.log("Address: ", address);
    addAddress(address);

    setAddress({
      name: "",
      phone: "",
      addressLine: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      addressType: "",
    });

    setIsAddingAddress(false);
  };

  return (
    <div>
      <form onSubmit={handleAddressSubmit}>
        <div className="row mb-2">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              required
              minLength="4"
              value={address.name}
              onChange={(e) =>
                setAddress((prevVal) => ({ ...prevVal, name: e.target.value }))
              }
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phoneNumber" className="form-label">
              Phone:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="form-control"
              maxLength="10"
              required
              value={address.phone}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                setAddress((prevVal) => ({ ...prevVal, phone: onlyDigits }));
              }}
            />
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="addressLine" className="form-label">
            Address Line:
          </label>
          <input
            type="text"
            id="addressLine"
            className="form-control"
            minLength="3"
            required
            value={address.addressLine}
            onChange={(e) =>
              setAddress((prevVal) => ({
                ...prevVal,
                addressLine: e.target.value,
              }))
            }
          />
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <label htmlFor="landmark" className="form-label">
              Landmark:
            </label>
            <input
              type="text"
              id="landmark"
              className="form-control"
              minLength="3"
              value={address.landmark}
              onChange={(e) =>
                setAddress((prevVal) => ({
                  ...prevVal,
                  landmark: e.target.value,
                }))
              }
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="pincode" className="form-label">
              Pincode:
            </label>
            <input
              type="tel"
              id="pincode"
              className="form-control"
              maxLength="6"
              required
              value={address.pincode}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                setAddress((prevVal) => ({ ...prevVal, pincode: onlyDigits }));
              }}
            />
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <label htmlFor="city" className="form-label">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="form-control"
              minLength="3"
              required
              value={address.city}
              onChange={(e) =>
                setAddress((prevVal) => ({
                  ...prevVal,
                  city: e.target.value,
                }))
              }
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="state" className="form-label">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="form-control"
              minLength="3"
              required
              value={address.state}
              onChange={(e) =>
                setAddress((prevVal) => ({
                  ...prevVal,
                  state: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <label className="me-4">Address Type:</label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="Home"
            name="addressType"
            id="homeAddressType"
            onChange={(e) =>
              setAddress((prevVal) => ({
                ...prevVal,
                addressType: e.target.value,
              }))
            }
          />
          <label className="form-check-label" htmlFor="homeAddressType">
            Home
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="Work"
            name="addressType"
            id="workAddressType"
            onChange={(e) =>
              setAddress((prevVal) => ({
                ...prevVal,
                addressType: e.target.value,
              }))
            }
          />
          <label className="form-check-label" htmlFor="workAddressType">
            Work
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="Other"
            name="addressType"
            id="otherAddressType"
            onChange={(e) =>
              setAddress((prevVal) => ({
                ...prevVal,
                addressType: e.target.value,
              }))
            }
          />
          <label className="mb-3 form-check-label" htmlFor="otherAddressType">
            Other
          </label>
        </div>
        <br />

        <button type="submit" className="me-3 btn btn-primary">
          Save Address
        </button>
        <button
          className="btn btn-danger"
          onClick={() => setIsAddingAddress(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddAddress;
