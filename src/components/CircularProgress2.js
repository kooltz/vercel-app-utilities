import React from "react";
import styles from "../../styles/Component.module.css";

const CircularProgress2 = (props) => {
  return (
    <div
      className={`${styles.circularProgress} ${
        props.isInside ? styles.inside : styles.full
      }`}
      style={{
        display: props.open ? "flex" : "none",
      }}
    >
      <span>
        <svg viewBox="22 22 44 44">
          <circle
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            strokeWidth="3.6"
          ></circle>
        </svg>
      </span>
    </div>
  );
};

export default CircularProgress2;
