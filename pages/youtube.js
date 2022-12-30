import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { CustomAppBar, NotionPageSearchBar } from "../src/components";
import darkTheme from "../src/theme";
import { getNotionPageProps, makeSharpTagList } from "../src/dataProcessor";
import { getBlogInfo } from "../src/wrapper/naverHandler";
import { PAGE_TITLE_CONST } from "../src/const/pageTitleConst";
import { DESCRIPTION_TEMPLATE } from "../src/const/templateConst";
import componentStyles from "../styles/Component.module.css";

const NotionUtil = () => {
  const [description, setDescription] = useState(" ");
  const [blogPostTagList, setBlogPostTagList] = useState(" ");
  const [blogPostTitle, setBlogPostTitle] = useState(" ");

  const [open, setOpen] = useState(false);

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
        alert("클립보드에 복사했습니다.");
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

          <hr></hr>
          <div style={{ margin: "20px 0px", textAlign: "center" }}>
            <input
              type="text"
              disabled
              value={blogPostTitle}
              style={{
                width: "90%",
                height: "40px",
                fontSize: "14px",
                padding: "5px 10px",
                border: "1px solid blue",
                borderRadius: "3px",
                backgroundColor: "lightgray",
                placeholder: "블로그 제목",
              }}
            ></input>
            <button
              type="button"
              className={componentStyles.copyButton}
              onClick={() => copyClipboard(blogPostTitle)}
            >
              복사
            </button>
          </div>
          <div style={{ margin: "20px 0px", textAlign: "center" }}>
            <textarea
              disabled
              value={description}
              style={{
                width: "90%",
                height: "360px",
                fontSize: "14px",
                border: "1px solid blue",
                borderRadius: "3px",
                backgroundColor: "lightgray",
                placeholder: "설명",
                padding: "5px 10px",
                boxSizing: "border-box",
                lineHeight: "1.4",
              }}
            ></textarea>
            <button
              type="button"
              className={componentStyles.copyButton}
              onClick={() => copyClipboard(description)}
            >
              복사
            </button>
          </div>
          <div style={{ margin: "20px 0px", textAlign: "center" }}>
            <textarea
              disabled
              value={blogPostTagList}
              style={{
                width: "90%",
                height: "80px",
                fontSize: "14px",
                border: "1px solid blue",
                borderRadius: "3px",
                backgroundColor: "lightgray",
                placeholder: "블로그 태그",
                padding: "5px 10px",
                boxSizing: "border-box",
                lineHeight: "1.4",
              }}
            ></textarea>
            <button
              type="button"
              className={componentStyles.copyButton}
              onClick={() => copyClipboard(blogPostTagList)}
            >
              복사
            </button>
          </div>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default NotionUtil;
