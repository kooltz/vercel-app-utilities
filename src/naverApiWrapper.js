import axios from "axios";
import url from "url";

function parseUrl(blogUrl) {
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

export async function getBlogTagList(blogUrl) {
  const { blogId, postId } = parseUrl(blogUrl);
  const { data } = await axios.get("/api/naver/blog-tag-list", {
    params: {
      blogId: blogId,
      logNoList: postId,
    },
  });
  return decodeURIComponent(data).split(",");
}

export async function getBlogTitle(blogUrl) {
  const { blogId, postId } = parseUrl(blogUrl);
  const { data } = await axios.get("/api/naver/blog-title", {
    params: {
      blogId: blogId,
      logNo: postId,
    },
  });
  return decodeURIComponent(data);
}
