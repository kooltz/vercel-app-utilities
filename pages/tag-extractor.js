import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, TextField, Button, Box } from "@mui/material";
import CustomAppBar from "/src/components/CustomAppBar";
import Head from "next/head";
import processExtract from "/src/processExtract";

const pageTitle = "Tag Extractor";
const theme = createTheme();

export default function TagExtractor() {
  async function handleExtract() {
    const blogurl = document.getElementById("url");
    console.log(blogurl.value);
    const result = await processExtract(blogurl.value);
    const elemTextArea = document.getElementById("result");
    elemTextArea.value = result;
  }

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomAppBar title="Tag Extractor" backurl="/"></CustomAppBar>

        <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
          <Box>
            <TextField
              sx={{ width: "75%" }}
              variant="outlined"
              size="small"
              label="URL"
              id="url"
            />
            <Button
              sx={{ ml: 3, mt: 0.3, width: "20%" }}
              variant="contained"
              onClick={handleExtract}
            >
              Extract
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              multiline
              fullWidth
              disabled
              rows={4}
              variant="outlined"
              id="result"
            ></TextField>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
