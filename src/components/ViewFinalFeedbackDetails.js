import React from "react";
import { Grid,TextField,Button } from "@mui/material";

export default function ViewFinalFeedbackDetails({ rating, comments }) {
  const renderRatingStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starIcons.push(<span key={i}>&#9733;</span>); // Full star
      } else if (i === fullStars && hasHalfStar) {
        starIcons.push(<span key={i}>&#9733;&#189;</span>); // Half star
      } else {
        starIcons.push(<span key={i}>&#9734;</span>); // Empty star
      }
    }

    return starIcons;
  };

  return (
    <div>
      <h2 className='feedback-header'>Final Feedback Details</h2>
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <p className='feedback-rating'>Rating: {renderRatingStars()}</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
            className="feedback-textfield"
            id="outlined-basic"
            label='Comments'
            variant="filled"
            value={comments}
            InputProps={{readOnly: true,}}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
