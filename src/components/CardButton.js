import React from "react";
import styles from "../../styles/Component.module.css";

const CardButton = (props) => {
  return (
    <div className={styles.cardButton}>
      <p>
        <a href={props.url}>{props.title}</a>
      </p>
    </div>
  );
};
export default CardButton;
