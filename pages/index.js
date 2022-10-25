import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Box } from "@mui/material";
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

      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
        {allMenus.map((menu) => (
          <Box key={menu.id} sx={{ minWidth: 150, mt: 2, mb: 2 }}>
            <CardButton url={menu.url} title={menu.title}></CardButton>
          </Box>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default Home;
