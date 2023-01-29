import React, { useState } from "react";
import {
  CustomAppBar,
  MultiLineText,
  CircularProgress2,
  PageSearchInput,
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
      {/* <CircularProgress2 open={open} isInside={false} /> */}

      <main
        style={{
          maxWidth: "600px",
          padding: "0px 24px",
          margin: "24px auto",
        }}
      >
        <PageSearchInput
          resultCallback={selectedPageCallback}
        ></PageSearchInput>

        <CircularProgress2 open={open} isInside={false} />
        <div>
          <MultiLineText
            value={blogPostTitle}
            placeholder="블로그 제목을 표시합니다."
            height="50px"
          />
          <MultiLineText
            value={description}
            placeholder="상세 설명을 표시합니다."
            height="360px"
          />
          <MultiLineText
            value={blogPostTagList}
            placeholder="블로그 태그를 표시합니다."
            height="80px"
          />
        </div>
      </main>
    </React.Fragment>
  );
};

export default NotionUtil;
