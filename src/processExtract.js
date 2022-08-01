import axios from "axios";
import url from "url";

function parseUrl(blogUrl) {
  const u = url.parse(blogUrl);

  const path = u.path[0] === "/" ? u.path.substring(1, u.path.length) : u.path;
  const paths = path.split("/");
  //`https://blog.naver.com/BlogTagListInfo.naver?blogId=${paths[0]}&logNoList=${paths[1]}&logType=mylog`;

  let result = {
    blogId: "",
    logNoList: "",
  };

  if (u.hostname === "blog.naver.com" && paths.length >= 2) {
    result.blogId = paths[0];
    result.logNoList = paths[1];
  }

  return result;
}

export default async function processExtract(blogUrl) {
  const params = parseUrl(blogUrl);
  const { data } = await axios.get("/api/tag-extract", {
    params: params,
  });
  return decodeURIComponent(data).split(",");
}
