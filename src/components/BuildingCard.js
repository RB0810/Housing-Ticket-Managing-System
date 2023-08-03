import { Grid, TextField } from "@mui/material";
import "../styles/manageacc.css"

const BuildingCard = ({ building, onClick }) => {

  const building_address = building.Address.concat(', #',building.PostalCode)
  
  const contact_deets = building.supervisor.SupervisorEmail.concat(', ', building.supervisor.SupervisorPhone)

  return (
    <button className="building-card" onClick={onClick}>
      <Grid container spacing={1}>
        <Grid item xs={12} >
          <h2 class="underlined-text">{building.BuildingName}</h2>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            className="buildingcard-textfield"
            id="outlined-basic" 
            label = 'Location'
            variant="filled" 
            type="text"
            value= {building_address}
            InputProps={{readOnly: true,}}/>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            className="buildingcard-textfield"
            id="outlined-basic" 
            label = 'Supervisor'
            variant="filled" 
            type="text"
            value={building.supervisor.SupervisorName}
            InputProps={{readOnly: true,}}/>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            className="buildingcard-textfield"
            id="outlined-basic" 
            label = 'Contact Details'
            variant="filled" 
            type="text"
            value={contact_deets}
            InputProps={{readOnly: true,}}/>
        </Grid>
      </Grid>
    </button>
  );
};

export default BuildingCard;
