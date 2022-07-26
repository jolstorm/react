import React, { memo } from "react";

function Card(props) {
  const { width, margin, content } = props;
  return (
    <div
      className="card"
      style={{
        height: "100px",
        minWidth: `${width}px`,
        background: "blue",
        marginRight: `${margin}px`,
      }}
    >
      <p> {content}</p>
    </div>
  );
}

export default memo(Card);
