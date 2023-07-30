import React from 'react';
import "../styles/buildings.css"
import {Button, Grid, TextField} from '@mui/material'

const BuildingDetails = ({ building }) => {
  const { staff, tenant } = building;

  console.log(building);

  return (
    <div className="building-details">
      <div className='building-details-staffcard'>
        <div className="building-details-col25">
        <h2 className='building-details-label'>Staff</h2>
      </div>
        
        {staff.map((staffMember) => (
          <div className='building-details-row'>
            <div className="building-details-col75" key={staffMember.StaffID}>
            <hr></hr>
            <Grid container spacing={1}>
              <Grid item xs = {12}>
                <h4>Staff: {staffMember.StaffID}</h4>
              </Grid>
              <Grid item xs = {12}>
                <TextField 
                className="building-details-textfield"
                id="outlined-basic" 
                label="Name" 
                variant="filled" 
                defaultValue={staffMember.StaffName}
                InputProps={{readOnly: true,}}/>
              </Grid>
              <Grid item xs = {12}>
                <TextField 
                className="building-details-textfield"
                id="outlined-basic" 
                label="Email" 
                variant="filled" 
                defaultValue={staffMember.StaffEmail}
                InputProps={{readOnly: true,}}/>
              </Grid>
              <Grid item xs = {12}>
                <TextField 
                className="building-details-textfield"
                id="outlined-basic" 
                label="Phone Number" 
                variant="filled" 
                defaultValue={staffMember.StaffPhone}
                InputProps={{readOnly: true,}}/>
              </Grid>
            </Grid>
            <hr></hr>
            </div>
          </div>
        ))}
      </div>
      

      <hr></hr>

      <div className="section">
        <h2 className='building-details-label'>Tenants</h2>

        {tenant.map((tenantData) => (
          <div className="tenant-item" key={tenantData.TenantID}>
            <div className="building-details-row">
              <div className="building-details-tenant-col25">
                <h2 className='building-details-sub-label'>Personal Details:</h2>
              </div>
              <div className="building-details-tenant-col75">
                <Grid container spacing={1}>
                  <Grid item xs = {12}>
                    <TextField 
                    className="building-details-textfield"
                    id="outlined-basic" 
                    label="Name" 
                    variant="filled" 
                    defaultValue={tenantData.TenantName}
                    InputProps={{readOnly: true,}}/>
                  </Grid>
                  <Grid item xs = {12}>
                    <TextField 
                    className="building-details-textfield"
                    id="outlined-basic" 
                    label="Email" 
                    variant="filled" 
                    defaultValue={tenantData.TenantEmail}
                    InputProps={{readOnly: true,}}/>
                  </Grid>
                  <Grid item xs = {12}>
                    <TextField 
                    className="building-details-textfield"
                    id="outlined-basic" 
                    label="Phone Number" 
                    variant="filled" 
                    defaultValue={tenantData.TenantPhone}
                    InputProps={{readOnly: true,}}/>
                  </Grid>
                </Grid>
                <hr></hr>
              </div>
            </div>

            <div className="building-details-row">
              <div className="building-details-tenant-col25">
                <h2 className='building-details-sub-label'>Lease Details:</h2>
              </div>
              <div className="building-details-tenant-col75">
                {tenantData.LeaseDetails && (
                  <div>
                    <Grid container spacing={1}>
                      <Grid item xs = {12}>
                        <TextField 
                        className="building-details-textfield"
                        id="outlined-basic" 
                        label="Commence Date" 
                        variant="filled" 
                        defaultValue={new Date(tenantData.LeaseDetails.CommenceDate).toLocaleDateString()}
                        InputProps={{readOnly: true,}}/>
                      </Grid>
                      <Grid item xs = {12}>
                        <TextField 
                        className="building-details-textfield"
                        id="outlined-basic" 
                        label="Termination Date" 
                        variant="filled" 
                        defaultValue={new Date(tenantData.LeaseDetails.TerminationDate).toLocaleDateString()}
                        InputProps={{readOnly: true,}}/>
                      </Grid>
                      <Grid item xs = {12}>
                        <TextField 
                        className="building-details-textfield"
                        id="outlined-basic" 
                        label="Monthly Rental" 
                        variant="filled" 
                        defaultValue={tenantData.LeaseDetails.MonthlyRental}
                        InputProps={{readOnly: true,}}/>
                      </Grid>
                      <Grid item xs = {12}>
                        <TextField 
                        className="building-details-textfield"
                        id="outlined-basic" 
                        label="Business Type" 
                        variant="filled" 
                        defaultValue={tenantData.LeaseDetails.TradeType}
                        InputProps={{readOnly: true,}}/>
                      </Grid>
                      <Grid item xs = {12}>
                        <TextField 
                        className="building-details-textfield"
                        id="outlined-basic" 
                        label="Area" 
                        variant="filled" 
                        defaultValue={tenantData.LeaseDetails.AreaInSqMeters}
                        InputProps={{readOnly: true,}}/>
                      </Grid>
                      <Grid item xs = {12}>
                        <TextField 
                        className="building-details-textfield"
                        id="outlined-basic" 
                        label="Units" 
                        variant="filled" 
                        defaultValue={tenantData.Units.map((unit) => unit.UnitNumber).join(', ')}
                        InputProps={{readOnly: true,}}/>
                      </Grid>
                    </Grid>
                    <br></br>
                  </div>
                )}
              </div>

              <hr></hr>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingDetails;
