import React from "react";
import styles from "../../styles/Component.module.css";

const MultiLineText = (props) => {
  return (
    <textarea
      disabled
      value={props.value}
      placeholder={props.placeholder}
      className={styles.multiLineText}
      style={{
        height: props.height,
      }}
    ></textarea>
  );
};

export default MultiLineText;
