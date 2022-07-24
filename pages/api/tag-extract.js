const axios = require("axios");

export default function handler(req, res) {
  // res.status(200).json({ name: "John Doe" });

  const url =
    "https://blog.naver.com/BlogTagListInfo.naver?blogId=s600105&logNoList=222811851369&logType=mylog";
  axios.get(url).then((result) => {
    res.status(200).json(result.data);
  });
}
