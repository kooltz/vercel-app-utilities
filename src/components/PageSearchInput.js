import React, { useState } from "react";
import CircularProgress2 from "./CircularProgress2";
import { getNotionPages } from "../dataProcessor";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  width: 60%;
  height: 32px;
  font-size: 14px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px 5px;
`;

const ResultPopup = styled.div`
  display: none;
  z-index: 1999;
`;

const ResultContent = styled.span`
  position: absolute;
  display: inline-block;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: white;
  max-height: 300px;
  overflow-y: auto;
`;

const ResultList = styled.ul`
  text-align: left;
  margin: 0;
  padding: 10px 0px;
  font-size: 10pt;
  font-weight: normal;
`;

const ResultListItem = styled.li`
  display: block;
  padding: 10px 15px;
  cursor: pointer;
`;

let keyPressedTimer = null;

const PageSearchInput = (props) => {
  const [searchText, setSearchText] = useState("");
  const [prevInputText, setPrevInputText] = useState("");
  const [notionPageSearchList, setNotionPageSearchList] = useState([]);

  const [popupOpen, setPopupOpen] = useState(false);
  const [showPopupProgress, setShowPopupProgress] = useState(false);

  function closePopup() {
    console.log("close popup!!!!!!!");
    setPopupOpen(false);
  }

  async function showNotionSearchResult() {
    setNotionPageSearchList([]);

    if (searchText.length > 1) {
      setPopupOpen(true);
      setShowPopupProgress(true);
      const pages = await getNotionPages(searchText);
      setShowPopupProgress(false);
      console.log(pages);

      setNotionPageSearchList(pages);
    } else {
      setNotionPageSearchList([]);
      setPopupOpen(false);
      // closePopup();
    }
  }

  function handleOnChange(e) {
    const newText = e.target.value;

    if (searchText !== newText) {
      console.log(`searchText : ${searchText},  newText: ${newText}`);

      // setPopupOpen(false);
      // closePopup();
    }
    setSearchText(newText);

    e.prevent;
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

    let trimmedText = searchText.trim();
    if (trimmedText !== prevInputText) {
      setPrevInputText(trimmedText);
      closePopup();
    }
  }

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="페이지 검색"
        value={searchText}
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
      ></SearchInput>

      <ResultPopup style={{ display: popupOpen ? "inline-block" : "none" }}>
        <ResultContent
          style={{
            left: "366px",
            top: "120px",
            width: "332px",
          }}
        >
          <ResultList>
            {notionPageSearchList.map((item) => (
              <ResultListItem
                key={item.id}
                onClick={() => {
                  console.log("clicked item :: ", item);
                  setPopupOpen(false);
                  // closePopup();
                  setSearchText(item.title);
                  props.resultCallback(item.id);
                }}
              >
                {item.emoji} {item.title}
              </ResultListItem>
            ))}
          </ResultList>
          <CircularProgress2 open={showPopupProgress} isInside={true} />
        </ResultContent>
      </ResultPopup>
    </Container>
  );
};

export default PageSearchInput;
