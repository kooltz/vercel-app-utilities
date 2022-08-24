import * as React from "react";
import type { NextPage } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Box } from "@mui/material";
import CustomAppBar from "../src/components/CustomAppBar";
import CardButton from "../src/components/CardButton";
import darkTheme from "../src/theme";

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CustomAppBar title="Kooltz Utility"></CustomAppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
        <Box sx={{ minWidth: 150, mt: 2, mb: 2 }}>
          <CardButton url="./notion-util" title="노션 유틸"></CardButton>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
