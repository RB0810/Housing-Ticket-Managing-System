import React from 'react';
import "../styles/buildings.css"

const BuildingDetails = ({ building }) => {
  const { staff, tenant } = building;

  return (
    <div className="building-details">
      <div className="section">
        <h3>Staff</h3>
        {staff.map((staffMember) => (
          <div className="staff-item" key={staffMember.StaffID}>
            <p>Name: {staffMember.StaffUsername}</p>
            <p>Contact: {staffMember.StaffEmail}, {staffMember.StaffPhone}</p>
            <p>Ticket Category: {staffMember.TicketCategory}</p>
          </div>
        ))}
      </div>
      <div className="section">
        <h3>Tenants</h3>
        {tenant.map((tenantData) => (
          <div className="tenant-item" key={tenantData.TenantID}>
            <div className="tenant-details">
              <p>Name: {tenantData.TenantUsername}</p>
              <p>Contact: {tenantData.TenantEmail}, {tenantData.TenantPhone}</p>
            </div>
            <div className="lease-details">
              <p>Lease Details:</p>
              {tenantData.LeaseDetails && (
                <div>
                  <p>Commence Date: {new Date(tenantData.LeaseDetails.CommenceDate).toLocaleDateString()}</p>
                  <p>Termination Date: {new Date(tenantData.LeaseDetails.TerminationDate).toLocaleDateString()}</p>
                  <p>Monthly Rental: {tenantData.LeaseDetails.MonthlyRental}</p>
                  <p>Business Type: {tenantData.LeaseDetails.TradeType}</p>
                  <p>Area: {tenantData.LeaseDetails.AreaInSqMeters}</p>
                </div>
              )}
            </div>
            <div className="units">
              <p>Units: {tenantData.Units.map((unit) => unit.UnitNumber).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingDetails;
