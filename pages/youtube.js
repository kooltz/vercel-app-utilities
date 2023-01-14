import React, { useState } from "react";
import {
  CopyButton,
  CustomAppBar,
  MultiLineText,
  CircularProgress2,
} from "../src/components";
import {
  getNotionPageProps,
  makeSharpTagList,
  getNotionPages,
} from "../src/dataProcessor";
import { getBlogInfo } from "../src/wrapper/naverHandler";
import { PAGE_TITLE_CONST } from "../src/const/pageTitleConst";
import { DESCRIPTION_TEMPLATE } from "../src/const/templateConst";

let keyPressedTimer = null;

const NotionUtil = () => {
  const [searchText, setSearchText] = useState("");
  const [description, setDescription] = useState(" ");
  const [blogPostTagList, setBlogPostTagList] = useState(" ");
  const [blogPostTitle, setBlogPostTitle] = useState(" ");
  const [notionPageSearchList, setNotionPageSearchList] = useState([]);

  const [open, setOpen] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);

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
      setPopupOpen(false);
      setNotionPageSearchList([]);
    }
  }

  async function showNotionSearchResult() {
    if (searchText.length > 0) {
      // setOpen(true);

      const pages = await getNotionPages(searchText);
      console.log(pages);
      setNotionPageSearchList(pages);

      // setOpen(false);

      setPopupOpen(pages.length > 0);
    } else {
      setNotionPageSearchList([]);
      setPopupOpen(false);
    }
  }

  function handleSearchKeyUp(e) {
    if (keyPressedTimer) {
      console.log("KillTimer : ", searchText);
      clearTimeout(keyPressedTimer);
    }

    keyPressedTimer = setTimeout(() => {
      console.log("Timer!!!!!!", searchText);
      showNotionSearchResult();
    }, 500);
  }

  return (
    <React.Fragment>
      <CustomAppBar
        title={PAGE_TITLE_CONST.YOUTUBE_UTIL}
        backurl="/"
      ></CustomAppBar>
      <CircularProgress2 open={open} />

      <main
        style={{
          maxWidth: "600px",
          padding: "0px 24px",
          margin: "24px auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <input
            type="text"
            placeholder="페이지 검색"
            style={{
              width: "60%",
              height: "32px",
              fontSize: "14px",
              border: "1px solid lightgray",
              borderRadius: "3px",
              padding: "5px 5px",
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={(e) => handleSearchKeyUp(e)}
          ></input>

          <div
            style={{
              display: popupOpen ? "inline-block" : "none",
              zIndex: "19999",
            }}
          >
            <span
              style={{
                position: "absolute",
                display: "inline-block",
                border: "1px solid lightgray",
                borderRadius: "5px",
                backgroundColor: "white",
                left: "366px",
                top: "120px",
                width: "332px",
                maxHeight: "300px",
                overflowY: "scroll",
              }}
            >
              <ul
                style={{
                  textAlign: "left",
                  margin: "0px",
                  padding: "10px 0px",
                  fontSize: "10pt",
                  fontWeight: "normal",
                }}
              >
                {notionPageSearchList.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "block",
                      padding: "10px 15px",
                      cursor: "pointer",
                    }}
                    onDoubleClick={() => selectedPageCallback(item.id)}
                  >
                    {item.emoji} {item.title}
                  </li>
                ))}
              </ul>
            </span>
          </div>
        </div>

        <div style={{ margin: "20px 0px", textAlign: "center" }}>
          <MultiLineText
            value={blogPostTitle}
            placeholder="블로그 제목"
            height="50px"
          />
          <CopyButton content={blogPostTitle} />
        </div>
        <div style={{ margin: "20px 0px", textAlign: "center" }}>
          <MultiLineText
            value={description}
            placeholder="설명"
            height="360px"
          />
          <CopyButton content={description} />
        </div>
        <div style={{ margin: "20px 0px", textAlign: "center" }}>
          <MultiLineText
            value={blogPostTagList}
            placeholder="블로그 태그"
            height="80px"
          />
          <CopyButton content={blogPostTagList} />
        </div>
      </main>
    </React.Fragment>
  );
};

export default NotionUtil;
