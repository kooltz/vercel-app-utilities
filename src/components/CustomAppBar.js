import React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid rgba(240, 240, 240, 0.88);
`;

const Content = styled.div`
  min-height: 64px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  align-items: center;
`;

const Title = styled.h6`
  margin: 0px;
  font-weight: 500px;
  font-size: 1.25rem;
  line-height: 1.6;
  margin-right: ${(props) => (props.useBack ? "15px" : "0px")};
`;

const Link = styled.a`
  color: black;
`;

const CustomAppBar = (props) => {
  return (
    <Header>
      <Content>
        {props.backurl ? (
          <Title useBack={true}>
            <Link href={props.backurl}>&lt;</Link>
          </Title>
        ) : (
          <></>
        )}
        <Title>{props.title}</Title>
      </Content>
    </Header>
  );
};

export default CustomAppBar;
