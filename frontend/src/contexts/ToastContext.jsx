import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

const useToastContext = () => useContext(ToastContext);
export default useToastContext;

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </ToastContext.Provider>
  );
}
