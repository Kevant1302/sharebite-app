import { SessionProvider } from "next-auth/react";
import "../app/globals.css"; // reuse your existing stylesheet
import Navbar from "../components/Navbar";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}