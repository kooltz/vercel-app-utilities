import { getPage, getProperty, getPages } from "./wrapper/notionHandler";

export async function getNotionPages(name) {
  const pages = await getPages(name);
  return pages;
}

async function getPostUrl(pageId) {
  const { properties } = await getPage(pageId);

  const blogUrlId = properties["포스팅 URL"]["id"];
  const blogUrl = await getProperty(pageId, blogUrlId);

  return blogUrl;
}

async function getBgmCode(pageId) {
  const pageInfo = await getPage(pageId);

  const pageProps = pageInfo["properties"];
  const videoInfoId = pageProps["영상 정보"]["id"];
  const videoInfoPageId = await getProperty(pageId, videoInfoId);

  // 영상 정보 페이지
  const videoPageInfo = await getPage(videoInfoPageId);

  console.log("video : ", videoPageInfo);

  const videoPageProps = videoPageInfo["properties"];
  const bgmId = videoPageProps["BGM"]["id"];
  const bgmPageId = await getProperty(videoInfoPageId, bgmId);

  // BGM 페이지
  const bgmPageInfo = await getPage(bgmPageId);

  console.log("bgm : ", bgmPageInfo);

  const bgmPageProps = bgmPageInfo["properties"];
  const codeId = bgmPageProps["코드"]["id"];
  const bgmCode = await getProperty(bgmPageId, codeId);

  return bgmCode;
}

export async function getNotionPageProps(notionPageId) {
  const pageId = notionPageId;

  const blogUrl = await getPostUrl(pageId);
  console.log("blogUrl : ", blogUrl);

  const bgmCode = await getBgmCode(pageId);
  console.log("bgmCode : ", bgmCode);

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
