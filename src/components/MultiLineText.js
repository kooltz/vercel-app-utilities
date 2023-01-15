import React from "react";
import CopyButton from "./CopyButton";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0px;
  textalign: center;
`;

const ReadOnlyTextArea = styled.textarea`
  width: 90%;
  font-size: 14px;
  border: 1px solid gray;
  border-radius: 3px;
  background-color: lightgray;
  padding: 5px 10px;
  box-sizing: border-box;
  line-height: 1.4;
`;

const MultiLineText = (props) => {
  return (
    <Container>
      <ReadOnlyTextArea
        disabled
        value={props.value}
        placeholder={props.placeholder}
        style={{ height: props.height }}
      />
      <CopyButton content={props.value} />
    </Container>
  );
};

export default MultiLineText;
