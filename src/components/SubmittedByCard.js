const SubmittedByCard = ({ tenant }) => {
  try {
    return (
      <div>
        <p>Assigned To: {tenant.TenantName}</p>
        <p>Staff Contact: {tenant.TenantPhone}</p>
        <p>Staff Email: {tenant.TenantEmail}</p>
      </div>
    );
  } catch (error) {
    return <div>NO TENANT</div>;
  }
};

export default SubmittedByCard;
