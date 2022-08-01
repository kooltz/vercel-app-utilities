const axios = require("axios");

// https://blog.naver.com/BlogTagListInfo.naver?blogId=s600105&logNoList=222811851369&logType=mylog

export default function handler(req, res) {
  // blogId, logNoList
  const params = req.query;

  axios
    .get("https://blog.naver.com/BlogTagListInfo.naver", { params: params })
    .then((result) => {
      const { taglist } = result.data;

      if (!taglist || taglist.length === 0) {
        res.status(400).send("Invalid Response");
        return;
      }

      res.status(200).json(taglist[0]["tagName"]);
    });
}
