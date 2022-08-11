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

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomAppBar title="Kooltz Utility"></CustomAppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
        <Box sx={{ minWidth: 150 }}>
          <Card variant="outlined">
            <CardActions>
              <Button size="medium" href="./naver-blog-util">
                네이버 블로그 유틸
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
