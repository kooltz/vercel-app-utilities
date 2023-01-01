import * as React from "react";
import { CustomAppBar, CardButton } from "../src/components";

const allMenus = [
  {
    id: 1,
    url: "./youtube",
    title: "유튜브 동영상 세부정보",
  },
  {
    id: 2,
    url: "./test",
    title: "테스트 페이지",
  },
];

const Home = () => {
  return (
    <React.Fragment>
      <CustomAppBar title="메뉴"></CustomAppBar>

      <main>
        {allMenus.map((menu) => (
          <CardButton url={menu.url} title={menu.title} key={menu.id} />
        ))}
      </main>
    </React.Fragment>
  );
};

export default Home;
