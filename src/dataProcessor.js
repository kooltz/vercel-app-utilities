import { getPage, getProperty, getPages } from "./wrapper/notionHandler";

export async function getNotionPages(name) {
  const pages = await getPages(name);
  return pages;
}

export async function getNotionPageProps(notionPageId) {
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

export function makeSharpTagList(tagList) {
  let taggedList = [];
  tagList.forEach((tag) => {
    let tagged = "#" + tag.trim();
    taggedList.push(tagged);
  });
  return taggedList.join(" ");
}
