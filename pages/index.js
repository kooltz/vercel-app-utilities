import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Box } from "@mui/material";
import CustomAppBar from "../src/components/CustomAppBar";
import CardButton from "../src/components/CardButton";
import darkTheme from "../src/theme";

const Home = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CustomAppBar title="메뉴"></CustomAppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
        <Box sx={{ minWidth: 150, mt: 2, mb: 2 }}>
          <CardButton
            url="./youtube"
            title="유튜브 동영상 세부정보"
          ></CardButton>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
