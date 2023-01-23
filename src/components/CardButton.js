import React from "react";
import styled from "styled-components";

const Content = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  margin: 20px 10px;
  cursor: pointer;

  &:hover {
    background: rgba(224, 224, 224, 0.7);
  }
`;

const ButtonItem = styled.p`
  margin: 15px 20px;
`;
const ButtonText = styled.a`
  color: black;
`;

const CardButton = (props) => {
  return (
    <Content>
      <ButtonItem>
        <ButtonText href={props.url}>{props.title}</ButtonText>
      </ButtonItem>
    </Content>
  );
};
export default CardButton;
