import { useState } from "react";
import AddAddress from "./AddAddress";
import AddressItem from "./AddressItem";
import useAddressContext from "../contexts/AddressContext";

function AddressList() {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const { addresses, loading, error } = useAddressContext();

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && error && (
        <div className="text-danger text-center">
          {error || "Something went wrong!"}
        </div>
      )}

      {!loading && !error && (
        <>
          {addresses.length > 0 ? (
            <div>
              <div className="px-5 py-3 bg-white">
                {!isAddingAddress && (
                  <section className="py-3">
                    <h5>Manage Addresses</h5>
                    <div>
                      <button
                        className="w-100 btn btn-outline-primary rounded-0 mb-3"
                        onClick={() => setIsAddingAddress(true)}
                      >
                        <span className="fs-5">+</span> ADD A NEW ADDRESS
                      </button>
                    </div>
                    {addresses.map((address) => (
                      <AddressItem
                        key={address._id}
                        address={address}
                        isSelected={false}
                        onSelect={null}
                        showDelete={true}
                      />
                    ))}
                  </section>
                )}

                {isAddingAddress && (
                  <section>
                    <h5>Add a new address:</h5>
                    <AddAddress setIsAddingAddress={setIsAddingAddress} />
                  </section>
                )}
              </div>
            </div>
          ) : (
            <div className="fw-semibold fs-5 text-center text-danger">
              <span>No address found</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AddressList;
