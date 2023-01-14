import React, { useState } from "react";
import CircularProgress2 from "./CircularProgress2";
import { getNotionPages } from "../dataProcessor";

import styles from "../../styles/Component.module.css";

let keyPressedTimer = null;

const NotionSearchInput = (props) => {
  const [searchText, setSearchText] = useState("");
  const [notionPageSearchList, setNotionPageSearchList] = useState([]);

  const [popupOpen, setPopupOpen] = useState(false);
  const [showPopupProgress, setShowPopupProgress] = useState(false);

  async function showNotionSearchResult() {
    if (searchText.length > 0) {
      setPopupOpen(true);
      setShowPopupProgress(true);
      const pages = await getNotionPages(searchText);
      setShowPopupProgress(false);
      console.log(pages);

      setNotionPageSearchList(pages);
    } else {
      setNotionPageSearchList([]);
      setPopupOpen(false);
    }
  }

  function handleOnChange(e) {
    setSearchText(e.target.value);
    setPopupOpen(false);
  }

  function handleKeyUp(e) {
    if (keyPressedTimer) {
      console.log("KillTimer : ", searchText);
      clearTimeout(keyPressedTimer);
    }

    keyPressedTimer = setTimeout(() => {
      console.log("Timer!!!!!!", searchText);
      showNotionSearchResult();
    }, 500);
  }

  return (
    <div className={styles.notionSearchInput}>
      <input
        type="text"
        placeholder="페이지 검색"
        value={searchText}
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
      ></input>

      <div
        className={styles.popup}
        style={{ display: popupOpen ? "inline-block" : "none" }}
      >
        <span
          className={styles.content}
          style={{
            left: "366px",
            top: "120px",
            width: "332px",
          }}
        >
          <ul>
            {notionPageSearchList.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  console.log("clicked item :: ", item);
                  setPopupOpen(false);
                  setSearchText(item.title);
                  props.resultCallback(item.id);
                }}
              >
                {item.emoji} {item.title}
              </li>
            ))}
          </ul>
          <CircularProgress2 open={showPopupProgress} isInside={true} />
        </span>
      </div>
    </div>
  );
};

export default NotionSearchInput;
