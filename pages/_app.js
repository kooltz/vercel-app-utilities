import Head from "next/head";
import { SessionProvider, useSession } from "next-auth/react";
import "../styles/globals.css";

export default function KooltzUtilityApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Auth>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Kooltz Utility</title>
        </Head>
        <Component {...pageProps} />
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
