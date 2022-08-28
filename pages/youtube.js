import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  TextField,
  Box,
  Divider,
  Fab,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CustomAppBar, NotionPageSearchBar } from "../src/components";
import darkTheme from "../src/theme";
import { getNotionPageProps, makeSharpTagList } from "../src/dataProcessor";
import { getBlogInfo } from "../src/wrapper/naverHandler";
import { PAGE_TITLE_CONST } from "../src/const/pageTitleConst";
import { DESCRIPTION_TEMPLATE } from "../src/const/templateConst";

const NotionUtil = () => {
  const [description, setDescription] = useState(" ");
  const [blogPostTagList, setBlogPostTagList] = useState(" ");
  const [blogPostTitle, setBlogPostTitle] = useState(" ");

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [open, setOpen] = useState(false);

  function handleSnackBarClose() {
    setSnackBarOpen(false);
  }

  async function selectedPageCallback(pageId) {
    if (pageId.length === 0) {
      return;
    }

    try {
      setOpen(true);
      setBlogPostTitle(" ");
      setDescription(" ");
      setBlogPostTagList(" ");

      const { blogUrl, bgmCode } = await getNotionPageProps(pageId);
      const { blogTitle, blogTags } = await getBlogInfo(blogUrl);
      const sharpTagList = makeSharpTagList(blogTags);

      let desc = DESCRIPTION_TEMPLATE;
      desc = desc.replace("{blog_url}", blogUrl);
      desc = desc.replace("{blog_tags}", sharpTagList);
      desc = desc.replace("{music_code}", bgmCode);

      setBlogPostTitle(blogTitle);
      setDescription(desc);
      setBlogPostTagList(blogTags.join(","));
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  }

  function copyClipboard(content) {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setSnackBarOpen(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <CustomAppBar
          title={PAGE_TITLE_CONST.YOUTUBE_UTIL}
          backurl="/"
        ></CustomAppBar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Container component="main" maxWidth="md" sx={{ mb: 3, mt: 3 }}>
          <Box sx={{ mb: 3 }} textAlign="center">
            <NotionPageSearchBar selectedPageCallback={selectedPageCallback} />
          </Box>

          <Divider></Divider>

          <Box sx={{ mt: 3, fontSize: "8pt" }} textAlign="center">
            <TextField
              disabled
              sx={{
                width: "90%",
              }}
              inputProps={{ style: { fontSize: 14 } }}
              size="small"
              label="블로그 제목"
              placeholder="블로그 제목"
              variant="outlined"
              value={blogPostTitle}
            ></TextField>
            <Fab
              sx={{ position: "absolute", ml: 1 }}
              color="primary"
              size="small"
            >
              <ContentCopyIcon
                fontSize="small"
                onClick={() => copyClipboard(blogPostTitle)}
              />
            </Fab>
          </Box>
          <Box sx={{ mt: 5, textAlign: "center" }}>
            <TextField
              multiline
              disabled
              sx={{ width: "90%" }}
              inputProps={{ style: { fontSize: 14, lineHeight: 1.4 } }}
              size="small"
              //rows={15}
              label="설명"
              placeholder="설명"
              variant="outlined"
              value={description}
            ></TextField>
            <Fab
              sx={{ position: "absolute", ml: 1 }}
              color="primary"
              size="small"
            >
              <ContentCopyIcon
                fontSize="small"
                onClick={() => copyClipboard(description)}
              />
            </Fab>
          </Box>
          <Box sx={{ mt: 5, textAlign: "center" }}>
            <TextField
              multiline
              disabled
              sx={{ width: "90%" }}
              inputProps={{ style: { fontSize: 14, lineHeight: 1.4 } }}
              size="small"
              //rows={3}
              label="블로그 태그"
              placeholder="블로그 태그"
              variant="outlined"
              value={blogPostTagList}
            ></TextField>
            <Fab
              sx={{ position: "absolute", ml: 1 }}
              color="primary"
              size="small"
            >
              <ContentCopyIcon
                fontSize="small"
                onClick={() => copyClipboard(blogPostTagList)}
              />
            </Fab>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={snackBarOpen}
            onClose={handleSnackBarClose}
            autoHideDuration={1500}
            message="클립보드에 복사했습니다."
          />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default NotionUtil;
