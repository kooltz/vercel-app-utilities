import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  TextField,
  Box,
  Divider,
  IconButton,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CustomAppBar from "/src/components/CustomAppBar";
// import { getPage, getProperty, getPages } from "/src/notionApiWrapper";
// import { getBlogTagList, getBlogTitle } from "/src/naverApiWrapper";
import { getNotionPages, getDescriptions } from "/src/dataProcessor";

const PAGE_TITLE = "노션 유틸";

const theme = createTheme();

export default function NotionUtil() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [pageInfo, setPageInfo] = useState("");
  const [pageInfo2, setPageInfo2] = useState("");

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  async function handleInputChange(e) {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      setLoading(true);

      //   const pages = await getPages(value);
      const pages = await getNotionPages(value);
      setOptions(pages);

      setLoading(false);
    } else {
      setOptions([]);
    }
  }

  function handleOptionChange(event) {
    const { target } = event;
    const pageId = target.id;

    if (target.tagName.toLowerCase() === "div") {
      console.log(pageId);
      setSelectedPageId(pageId);
    }
  }

  async function handleGenerate() {
    if (selectedPageId.length === 0) {
      return;
    }

    try {
      setButtonLoading(true);

      //   const { properties } = await getPage(selectedPageId);
      //   const postUrlId = properties["포스팅 URL"]["id"];
      //   const bgmId = properties["🎵 BGM"]["id"];

      //   const postUrl = await getProperty(selectedPageId, postUrlId);
      //   const bgmPageId = await getProperty(selectedPageId, bgmId);
      //   setPageInfo(postUrl + " ===== " + bgmPageId);

      //   const { properties: prop2 } = await getPage(bgmPageId);
      //   const codeId = prop2["코드"]["id"];
      //   console.log("codeId", codeId);
      //   const bgmCode = await getProperty(bgmPageId, codeId);

      //   const blogPostTitle = await getBlogTitle(postUrl);
      //   const blogPostTagList = await getBlogTagList(postUrl);

      //   let result = `
      //   블로그 제목 : ${blogPostTitle}
      //   블로그 태그 : ${blogPostTagList}
      //   BGM : ${bgmCode}
      //   `;
      const result = await getDescriptions(selectedPageId);
      setPageInfo(result);
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
        <CustomAppBar title={PAGE_TITLE} backurl="/"></CustomAppBar>

        <Container component="main" maxWidth="md" sx={{ mb: 4, mt: 4 }}>
          <Box sx={{ mb: 3 }} textAlign="center">
            <Autocomplete
              sx={{ width: "70%", display: "inline-block" }}
              freeSolo
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              onChange={handleOptionChange}
              isOptionEqualToValue={(option, value) =>
                option.title === value.title
              }
              getOptionLabel={(option) => option.title}
              options={options}
              loading={loading}
              renderOption={(props, option) => (
                <Box {...props} key={option.id} id={option.id}>
                  {option.emoji} {option.title}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="페이지 검색"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  onChange={handleInputChange}
                />
              )}
            />
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

          <Box sx={{ mt: 5 }} textAlign="center">
            <TextField
              multiline
              disabled
              sx={{ width: "100%" }}
              size="small"
              rows={15}
              label="페이지 정보"
              placeholder="페이지 정보"
              variant="outlined"
              value={pageInfo}
            ></TextField>
          </Box>
          <Box sx={{ mt: 5 }} textAlign="center">
            <TextField
              multiline
              disabled
              sx={{ width: "100%" }}
              size="small"
              rows={15}
              label="페이지 정보2"
              placeholder="페이지 정보2"
              variant="outlined"
              value={pageInfo2}
            ></TextField>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
