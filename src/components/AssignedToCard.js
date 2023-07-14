const AssignedToCard = ({ staff }) => {
  try {
    return (
      <div>
        <p>Assigned To: {staff.StaffName}</p>
        <p>Staff Contact: {staff.StaffPhone}</p>
        <p>Staff Email: {staff.StaffEmail}</p>
      </div>
    );
  } catch (error) {
    return <div>NO STAFF</div>;
  }
};

export default AssignedToCard;
