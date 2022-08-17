import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  TextField,
  Box,
  Divider,
  Fab,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LoadingButton } from "@mui/lab";
import CustomAppBar from "/src/components/CustomAppBar";
import NotionPageSearchBar from "/src/components/NotionPageSearchBar";
import {
  getNotionPageProps,
  getBlogInfo,
  makeSharpTagList,
} from "/src/dataProcessor";
import { PAGE_TITLE_CONST } from "/src/const/pageTitleConst";
import { DESCRIPTION_TEMPLATE } from "/src/const/templateConst";

const theme = createTheme();

export default function NotionUtil() {
  const [description, setDescription] = useState(" ");
  const [blogPostTagList, setBlogPostTagList] = useState(" ");
  const [blogPostTitle, setBlogPostTitle] = useState(" ");

  const [selectedPageId, setSelectedPageId] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  function selectedPageCallback(pageId) {
    setSelectedPageId(pageId);
  }
  function copyClipboard(content) {
    navigator.clipboard.writeText(content).then(() => {
      alert("Copied");
    });
  }

  async function handleGenerate() {
    if (selectedPageId.length === 0) {
      return;
    }

    try {
      setButtonLoading(true);
      setBlogPostTitle(" ");
      setDescription(" ");
      setBlogPostTagList(" ");

      const { blogUrl, bgmCode } = await getNotionPageProps(selectedPageId);
      const { blogTitle, blogTagList } = await getBlogInfo(blogUrl);
      const sharpTagList = makeSharpTagList(blogTagList);

      let desc = DESCRIPTION_TEMPLATE;
      desc = desc.replace("{blog_url}", blogUrl);
      desc = desc.replace("{blog_tags}", sharpTagList);
      desc = desc.replace("{music_code}", bgmCode);

      setBlogPostTitle(blogTitle);
      setDescription(desc);
      setBlogPostTagList(blogTagList);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomAppBar
          title={PAGE_TITLE_CONST.NOTION_UTIL}
          backurl="/"
        ></CustomAppBar>

        <Container component="main" maxWidth="md" sx={{ mb: 4, mt: 4 }}>
          <Box sx={{ mb: 3 }} textAlign="center">
            <NotionPageSearchBar selectedPageCallback={selectedPageCallback} />
            <LoadingButton
              sx={{
                ml: 3,
                mt: 4,
                width: "10%",
              }}
              variant="contained"
              loading={buttonLoading}
              onClick={handleGenerate}
            >
              생성
            </LoadingButton>
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
            <Fab sx={{ position: "absolute" }}>
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
            <Fab sx={{ position: "absolute" }}>
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
}
