import { useState } from "react";
import Star from "./Star";

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
}) {
  const styleContainer = {
    display: "flex",
    alignitems: "center",
    gap: "16px",
  };
  const starContainerStyle = {
    display: "flex",
  };
  const textStyle = {
    lineHeight: 1.5,
    margin: 0,
    color,
    fontSize: `${size / 1.5}px`,
  };

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  function handelRating(rating) {
    setRating(rating);
  }

  return (
    <div style={styleContainer}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            setRating={setRating}
            onRate={() => handelRating(i + 1)}
            onHoverIn={() => setHoverRating(i + 1)}
            onHoverOut={() => setHoverRating(0)}
            full={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{rating === 0 ? hoverRating : rating}</p>
    </div>
  );
}
