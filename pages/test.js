import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const TestPage = (props) => {
  const { data: session, status } = useSession();

  if (status === "loading") return <></>;

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
};

export default TestPage;
