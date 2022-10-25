import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SessionProvider, useSession } from "next-auth/react";

const clientSideEmotionCache = createEmotionCache();

export default function KooltzUtilityApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SessionProvider session={pageProps.session}>
      <Auth>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <title>Kooltz Utility</title>
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </Auth>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { status } = useSession({ required: true });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
