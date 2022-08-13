import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  Box,
  Card,
  CardActions,
  Button,
} from "@mui/material";
import CustomAppBar from "/src/components/CustomAppBar";

const theme = createTheme();

function CardButton(props) {
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

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomAppBar title="Kooltz Utility"></CustomAppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
        <CardButton url="./naver-blog-util">네이버 블로그 유틸</CardButton>
        <CardButton url="./notion-util">노션 유틸</CardButton>
      </Container>
    </ThemeProvider>
  );
}
