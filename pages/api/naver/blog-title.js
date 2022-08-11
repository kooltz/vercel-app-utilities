const axios = require("axios");

// https://blog.naver.com/PostViewBottomTitleListAsync.naver?blogId=s600105&logNo=222811851369

export default function handler(req, res) {
  // blogId, logNo
  const params = req.query;

  axios
    .get("https://blog.naver.com/PostViewBottomTitleListAsync.naver", {
      params: params,
    })
    .then((result) => {
      const { postList } = result.data;

      if (!postList || postList.length === 0) {
        res.status(400).send("Invalid Response");
        return;
      }

      let title = "";
      postList.forEach((post) => {
        const { logNo, filteredEncodedTitle } = post;

        if (logNo == params.logNo) {
          // logNo type : number, params.logNo type : string
          // found
          title = filteredEncodedTitle.replaceAll("+", " ");
          return;
        }
      });
      res.status(200).json(title);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}
