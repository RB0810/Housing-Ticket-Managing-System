import React, { useState } from "react";
import FeedbackCard from "./FeedbackCard";
import { useNavigate } from "react-router-dom";

const FeedbackComponent = (ticket) => {
  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState(null);

  const handleFeedbackClick = (type) => {
    setFeedbackType(type);
  };

  const handleReturnClick = () => {
    setFeedbackType(null);
  };

  const renderContent = () => {
    if (feedbackType === "feedback") {
      return (
        <div>
          <FeedbackCard ticket={ticket} />
        </div>
      );
    }

    if (feedbackType === "notSatisfied") {
      let rejectURL = `/tenantportal/${ticket.ticket["TenantID"]}/pending`;
      navigate(rejectURL);
    }

    return (
      <div>
        <button onClick={() => handleFeedbackClick("feedback")}>
          Give Feedback
        </button>
        <button onClick={() => handleFeedbackClick("notSatisfied")}>
          Not Satisfied
        </button>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default FeedbackComponent;
