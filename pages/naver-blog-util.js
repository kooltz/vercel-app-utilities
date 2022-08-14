import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  TextField,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CustomAppBar from "/src/components/CustomAppBar";
import Head from "next/head";
import { getBlogTagList, getBlogTitle } from "/src/naverApiWrapper";

const PAGE_TITLE = "네이버 블로그 유틸";
const theme = createTheme();

export default function TagExtractor() {
  const [loading, setLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogTagList, setBlogTagList] = useState("");
  const [sharpTagList, setSharpTagList] = useState("");

  function handleInputUrl(e) {
    setInputUrl(e.target.value);
  }

  function makeSharpTagList(tagList) {
    let taggedList = [];
    tagList.forEach((tag) => {
      let tagged = "#" + tag.trim();
      taggedList.push(tagged);
    });
    return taggedList.join(" ");
  }

  function copyClipboard(content) {
    navigator.clipboard.writeText(content).then(() => {
      alert("Copied");
    });
  }

  async function handleExtract() {
    setBlogTitle("");
    setBlogTagList("");
    setSharpTagList("");
    setLoading(true);

    try {
      const title = await getBlogTitle(inputUrl);
      setBlogTitle(title);

      const tagList = await getBlogTagList(inputUrl);
      setBlogTagList(tagList);

      const taggedList = makeSharpTagList(tagList);
      setSharpTagList(taggedList);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>{PAGE_TITLE}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomAppBar title={PAGE_TITLE} backurl="/"></CustomAppBar>

        <Container component="main" maxWidth="md" sx={{ mb: 4, mt: 4 }}>
          <Box sx={{ mb: 3 }} textAlign="center">
            <TextField
              sx={{ width: "480px" }}
              variant="outlined"
              size="small"
              label="블로그 주소"
              placeholder="https://blog.naver.com/~~~"
              onChange={handleInputUrl}
            />
            <LoadingButton
              sx={{ ml: 3, mt: 0.3, width: "100px" }}
              variant="contained"
              loading={loading}
              onClick={handleExtract}
            >
              실행
            </LoadingButton>
          </Box>

          <Divider>결과</Divider>

          <Box sx={{ mt: 5 }} textAlign="center">
            <TextField
              disabled
              sx={{ width: "60%" }}
              size="small"
              label="타이틀"
              placeholder="타이틀"
              variant="outlined"
              value={blogTitle}
            ></TextField>
          </Box>

          <Box sx={{ mt: 5 }} textAlign="center">
            <TextField
              multiline
              disabled
              sx={{ width: "90%" }}
              size="small"
              rows={5}
              label="태그 목록"
              placeholder="태그 목록"
              variant="outlined"
              value={blogTagList}
            ></TextField>
            <IconButton onClick={() => copyClipboard(blogTagList)}>
              <ContentCopyIcon />
            </IconButton>
          </Box>

          <Box sx={{ mt: 5 }} textAlign="center">
            <TextField
              multiline
              disabled
              sx={{ width: "90%" }}
              size="small"
              rows={5}
              label="#태그"
              placeholder="#태그"
              variant="outlined"
              value={sharpTagList}
            ></TextField>
            <IconButton onClick={() => copyClipboard(sharpTagList)}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
