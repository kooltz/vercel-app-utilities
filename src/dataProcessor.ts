import { getPage, getProperty, getPages } from "./api/notionHandler";
import { getBlogTagList, getBlogTitle } from "./api/naverHandler";

export async function getNotionPages(name: string) {
  const pages = await getPages(name);
  return pages;
}

export async function getNotionPageProps(notionPageId: string) {
  const pageId = notionPageId;

  const { properties } = await getPage(pageId);
  const blogUrlId = properties["포스팅 URL"]["id"];
  const bgmId = properties["🎵 BGM"]["id"];

  const blogUrl = await getProperty(pageId, blogUrlId);
  const bgmPageId = await getProperty(pageId, bgmId);
  // console.log("blogUrl : ", blogUrl);
  // console.log("bgmPageId : ", bgmPageId);

  const { properties: prop2 } = await getPage(bgmPageId);
  const codeId = prop2["코드"]["id"];
  const bgmCode = await getProperty(bgmPageId, codeId);
  // console.log("codeId : ", codeId);
  // console.log("bgmCode : ", bgmCode);

  return { blogUrl, bgmCode };
}

export async function getBlogInfo(blogUrl: string) {
  const blogTitle = await getBlogTitle(blogUrl);
  const blogTagList = await getBlogTagList(blogUrl);
  // console.log("blogTitle : ", blogTitle);
  // console.log("blogTagList : ", blogTagList);

  return { blogTitle, blogTagList };
}

export function makeSharpTagList(tagList: Array<string>) {
  let taggedList: Array<string> = [];
  tagList.forEach((tag) => {
    let tagged = "#" + tag.trim();
    taggedList.push(tagged);
  });
  return taggedList.join(" ");
}
