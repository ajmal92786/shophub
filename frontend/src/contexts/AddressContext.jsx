import { createContext, useContext, useEffect, useState } from "react";
import useUserContext from "./UserContext";

const AddressContext = createContext();

const useAddressContext = () => useContext(AddressContext);
export default useAddressContext;

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userInfo } = useUserContext();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function fetchAddresses() {
    if (!userInfo?._id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${BASE_URL}/api/addresses?userId=${userInfo._id}`
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Error in fetching adresses");
      }

      setAddresses(json?.data?.addresses);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function addAddress(addressData) {
    if (!userInfo?._id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo._id,
          name: addressData.name,
          phone: addressData.phone,
          addressLine: addressData.addressLine,
          landmark: addressData.landmark,
          pincode: addressData.pincode,
          city: addressData.city,
          state: addressData.state,
          addressType: addressData.addressType,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(
          json?.message || json?.error || "Error in adding address"
        );
      }

      setAddresses((prevVal) => [...prevVal, json?.data?.address]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateAddress(addressId, addressData) {
    if (!userInfo?._id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/addresses/${addressId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...addressData,
          userId: userInfo._id,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(
          json?.error || json?.message || "Erorr in updating address"
        );
      }

      setAddresses((prevAddresses) =>
        prevAddresses.map((addr) =>
          addr._id === addressId ? json?.data?.address : addr
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAddress(addressId) {
    if (!userInfo?._id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userInfo?._id }),
      });

      const json = await res.json();

      console.log("json: ", json);
      setAddresses((prevVal) =>
        prevVal.filter((address) => address._id !== json?.address._id)
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, [userInfo?._id]);

  return (
    <AddressContext.Provider
      value={{
        loading,
        error,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
