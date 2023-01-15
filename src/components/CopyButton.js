import React from "react";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  width: 60px;
  height: 30px;
  margin: 5px 10px;
  cursor: pointer;
  font-size: 12px;
`;

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
    <Button type="button" onClick={() => copyClipboard(props.content)}>
      복사
    </Button>
  );
};

export default CopyButton;
