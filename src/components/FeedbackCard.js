import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { Typography } from "@mui/material";

const FeedbackCard = (ticket) => {
  let navigate = useNavigate();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const submitFeedback = () => {
    console.log("Feedback submitted!");
    navigate(`/tenantportal/${ticket.ticket.ticket["TenantID"]}/pending`);
  };

  return (
    <div>
      <Typography component="legend">Rating</Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />

      <Typography component="legend">Feedback</Typography>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button className="btn" onClick={submitFeedback}>
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackCard;
