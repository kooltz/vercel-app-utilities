import React, { useState } from "react";
import { NextPage } from "next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LoadingButton } from "@mui/lab";
import CustomAppBar from "../src/components/CustomAppBar";
import NotionPageSearchBar from "../src/components/NotionPageSearchBar";
import {
  getNotionPageProps,
  getBlogInfo,
  makeSharpTagList,
} from "../src/dataProcessor";
import { PAGE_TITLE_CONST } from "../src/const/pageTitleConst";
import { DESCRIPTION_TEMPLATE } from "../src/const/templateConst";

const theme = createTheme();

const NotionUtil: NextPage = () => {
  const [description, setDescription] = useState(" ");
  const [blogPostTagList, setBlogPostTagList] = useState(" ");
  const [blogPostTitle, setBlogPostTitle] = useState(" ");

  const [open, setOpen] = useState(false);

  async function selectedPageCallback(pageId: string) {
    if (pageId.length === 0) {
      return;
    }

    try {
      setOpen(true);
      setBlogPostTitle(" ");
      setDescription(" ");
      setBlogPostTagList(" ");

      const { blogUrl, bgmCode } = await getNotionPageProps(pageId);
      const { blogTitle, blogTagList } = await getBlogInfo(blogUrl);
      const sharpTagList = makeSharpTagList(blogTagList);

      let desc = DESCRIPTION_TEMPLATE;
      desc = desc.replace("{blog_url}", blogUrl);
      desc = desc.replace("{blog_tags}", sharpTagList);
      desc = desc.replace("{music_code}", bgmCode);

      setBlogPostTitle(blogTitle);
      setDescription(desc);
      setBlogPostTagList(blogTagList.join(","));
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  }
  function copyClipboard(content: string) {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        alert("Copied");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomAppBar
          title={PAGE_TITLE_CONST.NOTION_UTIL}
          backurl="/"
        ></CustomAppBar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Container component="main" maxWidth="md" sx={{ mb: 4, mt: 4 }}>
          <Box sx={{ mb: 3 }} textAlign="center">
            <NotionPageSearchBar selectedPageCallback={selectedPageCallback} />
          </Box>

          <Divider></Divider>

          <Box sx={{ mt: 5 }}>
            <TextField
              disabled
              sx={{ width: "100%" }}
              size="small"
              label="블로그 제목"
              placeholder="블로그 제목"
              variant="outlined"
              value={blogPostTitle}
            ></TextField>
          </Box>
          <Box sx={{ mt: 5 }}>
            <TextField
              multiline
              disabled
              sx={{ width: "100%" }}
              size="small"
              rows={18}
              label="설명"
              placeholder="설명"
              variant="outlined"
              value={description}
            ></TextField>
            <Fab sx={{ position: "absolute" }} color="primary" size="small">
              <ContentCopyIcon
                fontSize="small"
                onClick={() => copyClipboard(description)}
              />
            </Fab>
          </Box>
          <Box sx={{ mt: 5 }}>
            <TextField
              multiline
              disabled
              sx={{ width: "100%" }}
              size="small"
              rows={3}
              label="블로그 태그"
              placeholder="블로그 태그"
              variant="outlined"
              value={blogPostTagList}
            ></TextField>
            <Fab sx={{ position: "absolute" }} color="primary" size="small">
              <ContentCopyIcon
                fontSize="small"
                onClick={() => copyClipboard(blogPostTagList)}
              />
            </Fab>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default NotionUtil;
