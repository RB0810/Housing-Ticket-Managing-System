import React from "react";

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
      <h2>Final Feedback Details</h2>
      <div>
        <p>Rating: {renderRatingStars()}</p>
        <p>Comments: {comments}</p>
      </div>
    </div>
  );
}
