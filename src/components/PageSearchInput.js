import React, { useState, useRef } from "react";
import CircularProgress2 from "./CircularProgress2";
import { getNotionPages } from "../dataProcessor";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const Content = styled.div`
  display: inline-block;
`;

const SearchInput = styled.input`
  height: 32px;
  font-size: 14px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px 5px;
  min-width: 360px;
`;

const ResultPopup = styled.div`
  display: none;
  z-index: 1999;
`;

const ResultContent = styled.span`
  position: absolute;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: white;
  max-height: 300px;
  min-width: 360px;
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

  &:hover {
    background: rgba(224, 224, 224, 0.7);
  }
`;

let keyPressedTimer = null;

const PageSearchInput = (props) => {
  const [searchText, setSearchText] = useState("");
  const [prevInputText, setPrevInputText] = useState("");
  const [notionPageSearchList, setNotionPageSearchList] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showPopupProgress, setShowPopupProgress] = useState(false);

  const inputRef = useRef();

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
    }
  }

  function handleOnChange(e) {
    console.log("handleOnChange : ", e);
    setSearchText(e.target.value);
  }

  function handleKeyUp(e) {
    console.log("handleKeyUp : ", e);

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
      setPopupOpen(false);
    }
  }

  function handleOnBlur(e) {
    console.log("handleOnBlur : ", e);
    // setTimeout(() => {
    //   setPopupOpen(false);
    // }, 100);
  }

  return (
    <Container>
      <Content>
        <SearchInput
          type="text"
          placeholder="페이지 검색"
          value={searchText}
          onChange={handleOnChange}
          onKeyUp={handleKeyUp}
          onBlur={handleOnBlur}
          ref={inputRef}
        ></SearchInput>

        <ResultPopup style={{ display: popupOpen ? "flex" : "none" }}>
          <ResultContent>
            <ResultList>
              {notionPageSearchList.map((item) => (
                <ResultListItem
                  key={item.id}
                  onClick={() => {
                    console.log("clicked item :: ", item);
                    inputRef.current.blur();
                    setPopupOpen(false);
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
      </Content>
    </Container>
  );
};

export default PageSearchInput;
