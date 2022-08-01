import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, TextField, Button, Box } from "@mui/material";
import CustomAppBar from "/src/components/CustomAppBar";
import Head from "next/head";
import processExtract from "/src/processExtract";

const pageTitle = "Tag Extractor";
const theme = createTheme();

export default function TagExtractor() {
  const [inputUrl, setInputUrl] = useState("");
  const [extractResult, setExtractResult] = useState("");
  const [taggedResult, setTaggedResult] = useState("");

  function handleInputUrl(e) {
    setInputUrl(e.target.value);
  }

  function makeTaggedList(tagList) {
    let taggedList = [];
    tagList.forEach((tag) => {
      let tagged = "#" + tag.trim();
      taggedList.push(tagged);
    });
    return taggedList.join(" ");
  }

  function handleExtractResultCopy() {
    navigator.clipboard.writeText(extractResult);
  }

  function handleTaggedResultCopy() {
    navigator.clipboard.writeText(taggedResult);
  }

  async function handleExtract() {
    const tagList = await processExtract(inputUrl);
    setExtractResult(tagList);

    const taggedList = makeTaggedList(tagList);
    setTaggedResult(taggedList);
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
              onChange={handleInputUrl}
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
              sx={{ width: "75%" }}
              multiline
              disabled
              rows={4}
              variant="outlined"
              value={extractResult}
            ></TextField>
            <Button
              sx={{ ml: 3, width: "20%", verticalAlign: "bottom" }}
              variant="outlined"
              onClick={handleExtractResultCopy}
            >
              Copy
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              sx={{ width: "75%" }}
              multiline
              disabled
              rows={4}
              variant="outlined"
              value={taggedResult}
            ></TextField>
            <Button
              sx={{ ml: 3, width: "20%", verticalAlign: "bottom" }}
              variant="outlined"
              onClick={handleTaggedResultCopy}
            >
              Copy
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
