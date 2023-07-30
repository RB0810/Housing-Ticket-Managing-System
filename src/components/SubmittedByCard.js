const SubmittedByCard = ({ tenant }) => {
  try {
    return (
      <div>
        <h2>Tenant Details</h2>
        <p>Submitted By: {tenant.TenantName}</p>
        <p>Tenant Contact: {tenant.TenantPhone}</p>
        <p>Tenant Email: {tenant.TenantEmail}</p>
      </div>
    );
  } catch (error) {
    return <div>TENANT ERROR</div>;
  }
};

export default SubmittedByCard;
