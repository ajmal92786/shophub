function UserInformation({ userInfo }) {
  return (
    <div className="px-5 py-3 bg-white">
      <h5>Personal Information</h5>
      <section className="py-3">
        <div className="d-flex flex-column">
          <span className="text-muted">Name: </span>
          <span className="fw-semibold">{userInfo.name}</span>
        </div>
        <div className="d-flex flex-column py-3">
          <span className="text-muted">Email: </span>
          <span className="fw-semibold">{userInfo.email}</span>
        </div>
        <div className="d-flex flex-column">
          <span className="text-muted">Phone: </span>
          <span className="fw-semibold">{userInfo.phone}</span>
        </div>
      </section>
    </div>
  );
}

export default UserInformation;
