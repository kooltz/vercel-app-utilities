import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, TextField, Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CustomAppBar from "/src/components/CustomAppBar";
import Head from "next/head";
import processExtract from "/src/processExtract";

const pageTitle = "Tag Extractor";
const theme = createTheme();

export default function TagExtractor() {
  const [loading, setLoading] = useState(false);
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
    navigator.clipboard.writeText(extractResult).then(() => {
      alert("Copied");
    });
  }

  function handleTaggedResultCopy() {
    navigator.clipboard.writeText(taggedResult).then(() => {
      alert("Copied");
    });
  }

  async function handleExtract() {
    setExtractResult("");
    setTaggedResult("");
    setLoading(true);

    try {
      const tagList = await processExtract(inputUrl);
      setExtractResult(tagList);

      const taggedList = makeTaggedList(tagList);
      setTaggedResult(taggedList);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
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
              placeholder="https://blog.naver.com/~~~"
              onChange={handleInputUrl}
            />
            <LoadingButton
              sx={{ ml: 3, mt: 0.3, width: "20%" }}
              variant="contained"
              loading={loading}
              onClick={handleExtract}
            >
              Extract
            </LoadingButton>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              sx={{ width: "75%" }}
              multiline
              disabled
              rows={4}
              placeholder="Result 1"
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
              placeholder="Result 2"
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
