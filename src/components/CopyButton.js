import React from "react";
import styles from "../../styles/Component.module.css";

const CopyButton = (props) => {
  const copyClipboard = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        alert("클립보드에 복사했습니다.");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <button
      type="button"
      className={styles.copyButton}
      onClick={() => copyClipboard(props.content)}
    >
      복사
    </button>
  );
};

export default CopyButton;
