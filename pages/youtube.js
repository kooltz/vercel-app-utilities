import React, { useState } from "react";
import {
  CopyButton,
  CustomAppBar,
  NotionPageSearchBar,
  MultiLineText,
  CircularProgress2,
} from "../src/components";
import { getNotionPageProps, makeSharpTagList } from "../src/dataProcessor";
import { getBlogInfo } from "../src/wrapper/naverHandler";
import { PAGE_TITLE_CONST } from "../src/const/pageTitleConst";
import { DESCRIPTION_TEMPLATE } from "../src/const/templateConst";

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
          <NotionPageSearchBar selectedPageCallback={selectedPageCallback} />
        </div>

        <hr></hr>
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
