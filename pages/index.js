import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import CustomAppBar from "../src/components/CustomAppBar";
import CardButton from "../src/components/CardButton";
import darkTheme from "../src/theme";

const allMenus = [
  {
    id: 1,
    url: "./youtube",
    title: "유튜브 동영상 세부정보",
  },
  {
    id: 2,
    url: "./test",
    title: "테스트 페이지",
  },
];

const Home = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CustomAppBar title="메뉴"></CustomAppBar>

      <main
        style={{
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
          boxSizing: "border-box",
        }}
      >
        {allMenus.map((menu) => (
          <>
            <CardButton url={menu.url} title={menu.title}></CardButton>
          </>
        ))}
      </main>
    </ThemeProvider>
  );
};

export default Home;
