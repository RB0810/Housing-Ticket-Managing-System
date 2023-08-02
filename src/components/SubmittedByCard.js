import { Grid, TextField } from "@mui/material";

const SubmittedByCard = ({ tenant }) => {
  try {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} >
            <h2 className="submittedbycard-header">Tenant Details</h2> 
          </Grid>
          <Grid item xs={12} >
            <TextField 
              className="submittedbycard-textfield"
              id="outlined-basic" 
              label = 'Submitted By'
              variant="filled" 
              type="text"
              value= {tenant.TenantName}
              InputProps={{readOnly: true,}}/>
          </Grid>
          <Grid item xs={12} >
            <TextField 
              className="submittedbycard-textfield"
              id="outlined-basic" 
              label = 'Tenant Phone Number'
              variant="filled" 
              type="text"
              value= {tenant.TenantPhone}
              InputProps={{readOnly: true,}}/>
          </Grid>
          <Grid item xs={12} >
            <TextField 
              className="submittedbycard-textfield"
              id="outlined-basic" 
              label = 'Tenant Email'
              variant="filled" 
              type="text"
              value= {tenant.TenantEmail}
              InputProps={{readOnly: true,}}/>
          </Grid>
        </Grid>
      </div>
    );
  } catch (error) {
    return <div>TENANT ERROR</div>;
  }
};

export default SubmittedByCard;
