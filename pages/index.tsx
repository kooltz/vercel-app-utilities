import * as React from "react";
import type { NextPage } from "next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  Box,
  Card,
  CardActions,
  Button,
} from "@mui/material";
import CustomAppBar, {
  CustomAppBarProps,
} from "../src/components/CustomAppBar";

const theme = createTheme();

function CardButton(props: any) {
  return (
    <Box sx={{ minWidth: 150, mt: 2, mb: 2 }}>
      <Card variant="outlined">
        <CardActions>
          <Button size="medium" href={props.url}>
            {props.children}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomAppBar title="Kooltz Utility"></CustomAppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
        <CardButton url="./notion-util">노션 유틸</CardButton>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
