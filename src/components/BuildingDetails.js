import React from 'react';
import "../styles/buildings.css"

const BuildingDetails = ({ building }) => {
  const { staff, tenant } = building;

  return (
    <div className="building-details">
          <p className='building-details-label'>Staff</p>
       
        
        {staff.map((staffMember) => (
          <div className='building-details-row'>
            <div className="building-details-col75" key={staffMember.StaffID}>
              <p><b>Name:</b> {staffMember.StaffName}</p>
              <p><b>Contact:</b> {staffMember.StaffEmail}, {staffMember.StaffPhone}</p>
            </div>
          </div>
        ))}

      <hr></hr>

      <div className="section">
        <p className='building-details-label'>Tenants</p>

        {tenant.map((tenantData) => (
          <div className="tenant-item" key={tenantData.TenantID}>

            <div className="building-details-col50">
              <p className='building-details-sub-label'>Personal Details:</p>
              <p><b>Name:</b> {tenantData.TenantName}</p>
              <p><b>Email:</b> {tenantData.TenantEmail}</p>
              <p><b>Phone Number:</b> {tenantData.TenantPhone}</p>
            </div>

            <div className="building-details-col50">
              <p className='building-details-sub-label'>Lease Details:</p>
              {tenantData.LeaseDetails && (
                <div>
                  <p><b>Commence Date:</b> {new Date(tenantData.LeaseDetails.CommenceDate).toLocaleDateString()}</p>
                  <p><b>Termination Date:</b> {new Date(tenantData.LeaseDetails.TerminationDate).toLocaleDateString()}</p>
                  <p><b>Monthly Rental:</b> {tenantData.LeaseDetails.MonthlyRental}</p>
                  <p><b>Business Type:</b> {tenantData.LeaseDetails.TradeType}</p>
                  <p><b>Area:</b> {tenantData.LeaseDetails.AreaInSqMeters}</p>
                  <p><b>Units:</b> {tenantData.Units.map((unit) => unit.UnitNumber).join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingDetails;
