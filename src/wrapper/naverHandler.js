import axios from "axios";
import url from "url";

function extractIds(blogUrl) {
  const u = url.parse(blogUrl);

  const path = u.path[0] === "/" ? u.path.substring(1, u.path.length) : u.path;
  const paths = path.split("/");

  let blogId = "";
  let postId = "";

  if (u.hostname === "blog.naver.com" && paths.length >= 2) {
    blogId = paths[0];
    postId = paths[1];
  }

  return {
    blogId: blogId,
    postId: postId,
  };
}

async function getBlogTagList(blogId, postId) {
  const { data } = await axios.get("/api/naver/blog/tag", {
    params: { blogId: blogId, logNoList: postId },
  });
  console.log("getBlogTagList => ", data);
  return decodeURIComponent(data).split(",");
}

async function getBlogTitle(blogId, postId) {
  const { data } = await axios.get("/api/naver/blog/title", {
    params: { blogId: blogId, logNo: postId },
  });
  console.log("getBlogTagTitle => ", data);
  return decodeURIComponent(data);
}

export async function getBlogInfo(blogUrl) {
  const { blogId, postId } = extractIds(blogUrl);

  const blogTitle = await getBlogTitle(blogId, postId);
  const blogTags = await getBlogTagList(blogId, postId);

  return {
    blogTitle: blogTitle,
    blogTags: blogTags,
  };
}
