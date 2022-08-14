import { getPage, getProperty, getPages } from "./notionApiWrapper";
import { getBlogTagList, getBlogTitle } from "./naverApiWrapper";

export async function getNotionPages(name) {
  const pages = await getPages(name);
  return pages;
}

export async function getDescriptions(notionPageId) {
  const pageId = notionPageId;

  const { properties } = await getPage(pageId);
  const postUrlId = properties["포스팅 URL"]["id"];
  const bgmId = properties["🎵 BGM"]["id"];

  const postUrl = await getProperty(pageId, postUrlId);
  const bgmPageId = await getProperty(pageId, bgmId);
  console.log("postUrl : ", postUrl);
  console.log("bgmPageId : ", postUrl);

  const { properties: prop2 } = await getPage(bgmPageId);
  const codeId = prop2["코드"]["id"];
  const bgmCode = await getProperty(bgmPageId, codeId);
  console.log("codeId : ", codeId);
  console.log("bgmCode : ", bgmCode);

  const blogPostTitle = await getBlogTitle(postUrl);
  const blogPostTagList = await getBlogTagList(postUrl);
  console.log("blogPostTitle : ", blogPostTitle);
  console.log("blogPostTagList : ", blogPostTagList);

  let result = `
      블로그 제목 : ${blogPostTitle}
      블로그 태그 : ${blogPostTagList}
      BGM : ${bgmCode}
      `;
  return result;
}
