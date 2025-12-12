function OrderItem({ order }) {
  console.log(order);

  function calculateDateAndTime(placedAt) {
    const date = new Date(placedAt);

    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    return date.toLocaleString("en-IN", options);
  }

  return (
    <div className="bg-white border mb-3">
      <div>
        {order.items.map((item) => (
          <div className="card p-1 rounded-0 border-0">
            <div className="row g-0">
              <div className="col-md-4" style={{ height: "100px" }}>
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  className="w-100 h-100 img-fluid object-fit-cover"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body p-0 px-2">
                  <h5 className="card-title">{item.product.title}</h5>
                  <div className="card-title">X {item.quantity}</div>
                  <div className="card-title fw-semibold">
                    ₹{item.product.price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-2 py-1 bg-light border-top d-flex justify-content-between">
        <div>
          <span className="text-muted">Ordered On: </span>
          <span className="fw-semibold">
            {calculateDateAndTime(order.placedAt)}
          </span>
        </div>
        <div>
          <span className="text-muted">Order Total: </span>
          <span className="fw-semibold">₹{Math.floor(order.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
