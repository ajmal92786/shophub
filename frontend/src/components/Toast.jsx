import { useEffect } from "react";

function Toast({ message, type = "success", show }) {
  if (!show) return null;

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 2000 }}
    >
      <div className={`toast show text-bg-${type} border-0`} role="alert">
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}

export default Toast;
