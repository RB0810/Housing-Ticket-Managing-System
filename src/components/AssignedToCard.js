import { Grid, TextField, Button } from "@mui/material";

const AssignedToCard = ({ staff }) => {
  try {
    return (
      <div>
        <h2 className="assignedtocard-header">Staff Details</h2>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
            className="assignedtocard-textfield"
            id="outlined-basic"
            label='Assigned To'
            variant="filled"
            value={staff.StaffName}
            InputProps={{readOnly: true,}}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
            className="assignedtocard-textfield"
            id="outlined-basic"
            label='Staff Contact'
            variant="filled"
            value={staff.StaffPhone}
            InputProps={{readOnly: true,}}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
            className="assignedtocard-textfield"
            id="outlined-basic"
            label='Staff Email'
            variant="filled"
            value={staff.StaffEmail}
            InputProps={{readOnly: true,}}/>
          </Grid>
        </Grid>
      </div>
    );
  } catch (error) {
    return <div>STAFF ERROR</div>;
  }
};

export default AssignedToCard;
