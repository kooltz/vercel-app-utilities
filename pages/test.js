import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { CustomAppBar, NotionPageSearchBar } from "../src/components";
import darkTheme from "../src/theme";
import { PAGE_TITLE_CONST } from "../src/const/pageTitleConst";

const TestPage = () => {
  const { data: session, status } = useSession();

  // console.log(`[TestPage] session : ${session}`);
  // console.log(`[TestPage] status : ${status}`);

  if (status === "loading") return <></>;

  // console.log(`[TestPage] session2 : ${JSON.stringify(session)}`);

  // console.log(`[TestPage] status2 : ${status}`);

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
  /*
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <CustomAppBar title={PAGE_TITLE_CONST.TEST} backurl="/"></CustomAppBar>

        <Container
          component="main"
          maxWidth="md"
          sx={{ mb: 3, mt: 3 }}
        ></Container>
      </ThemeProvider>
    </React.Fragment>
  );
  */
};

export default TestPage;
