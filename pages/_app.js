import * as React from "react";
import { PropTypes } from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

function KooltzUtilityApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Kooltz Utility</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />;
      </ThemeProvider>
    </CacheProvider>
  );
}

KooltzUtilityApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
export default KooltzUtilityApp;
