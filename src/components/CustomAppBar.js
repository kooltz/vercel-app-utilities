import React from "react";
import { AppBar } from "@mui/material";

const CustomAppBar = (props) => {
  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <div
        style={{
          minHeight: "64px",
          paddingLeft: "24px",
          paddingRight: "24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {props.backurl ? (
          <h6
            style={{
              margin: "0px",
              marginRight: "15px",
              fontWeight: "500px",
              fontSize: "1.25rem",
              lineHeight: "1.6",
            }}
          >
            <a
              href={props.backurl}
              style={{
                textDecorationLine: "none",
                color: "white",
              }}
            >
              &lt;
            </a>
          </h6>
        ) : (
          <></>
        )}
        <h6
          style={{
            margin: "0px",
            fontWeight: "500px",
            fontSize: "1.25rem",
            lineHeight: "1.6",
          }}
        >
          {props.title}
        </h6>
      </div>
    </AppBar>
  );
};

export default CustomAppBar;
