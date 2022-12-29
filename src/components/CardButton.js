import React from "react";

const CardButton = (props) => {
  return (
    <div
      style={{
        border: "1px solid white",
        borderRadius: "5px",
        margin: "20px 10px",
      }}
    >
      <p style={{ margin: "10px" }}>
        <a
          href={props.url}
          style={{
            textDecorationLine: "none",
            color: "white",
          }}
        >
          {props.title}
        </a>
      </p>
    </div>
  );
};
export default CardButton;
