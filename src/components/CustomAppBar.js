import React from "react";
import styles from "../../styles/Component.module.css";

const CustomAppBar = (props) => {
  return (
    <header className={styles.appBar}>
      <div className={styles.content}>
        {props.backurl ? (
          <h6 className={styles.backUrl}>
            <a href={props.backurl}>&lt;</a>
          </h6>
        ) : (
          <></>
        )}
        <h6>{props.title}</h6>
      </div>
    </header>
  );
};

export default CustomAppBar;
