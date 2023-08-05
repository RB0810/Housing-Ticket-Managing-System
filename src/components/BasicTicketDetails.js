import { Grid,TextField } from "@mui/material";
import React from "react";

const BasicTicketDetails = (ticket) => {

  function formatDateTime(timestamp) {
    var [datePart, timePart] = timestamp.split("T");
    const [hrs, mins, secs] = timePart.split(":");
    datePart = new Date(datePart).toLocaleDateString();
    const modifiedString = `${datePart}, ${hrs}:${mins}:${secs}`;
    return modifiedString;
  }

  return (
    <div>
      <h2 className="basicticketdetails-header">Basic Ticket Details</h2>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
          className="basicticketdetails-textfield"
          id="outlined-basic"
          label='PARC Status'
          variant="filled"
          value={ticket.ticket.PARCStatus}
          InputProps={{readOnly: true,}}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
          className="basicticketdetails-textfield"
          id="basic-ticket-details-status-textfield"
          label='Status'
          variant="filled"
          value={ticket.ticket.Status}
          InputProps={{readOnly: true,}}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
          className="basicticketdetails-textfield"
          id="outlined-basic"
          label='Name'
          variant="filled"
          value={ticket.ticket.Name}
          InputProps={{readOnly: true,}}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
          className="basicticketdetails-textfield"
          id="outlined-basic"
          label='Category'
          variant="filled"
          value={ticket.ticket.Category}
          InputProps={{readOnly: true,}}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
          className="basicticketdetails-textfield"
          id="outlined-basic"
          label='Description'
          variant="filled"
          value={ticket.ticket.Description}
          InputProps={{readOnly: true,}}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
          className="basicticketdetails-textfield"
          id="outlined-basic"
          label='Submitted'
          variant="filled"
          value={formatDateTime(ticket.ticket.SubmittedDateTime)}
          InputProps={{readOnly: true,}}/>
        </Grid>
        <Grid item xs={12}>
          {ticket.ticket.QuotationRequired !== null && (
            <TextField
            className="basicticketdetails-textfield"
            id="outlined-basic"
            label='Quotation Required'
            variant="filled"
            value={ticket.ticket.QuotationRequired ? "YES" : "NO"}
            InputProps={{readOnly: true,}}/>
          )}
        </Grid>
        <Grid item xs={12}>
          {ticket.ticket.QuotationAcceptanceDate !== null && (
            <TextField
            className="basicticketdetails-textfield"
            id="outlined-basic"
            label='Quotation Accepted'
            variant="filled"
            value={formatDateTime(ticket.ticket.QuotationAcceptanceDate)}
            InputProps={{readOnly: true,}}/>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default BasicTicketDetails;
