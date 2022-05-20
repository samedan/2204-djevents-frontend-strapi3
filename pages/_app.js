import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    // <AuthProvider>
    //   <Component {...pageProps} />
    // </AuthProvider>
    pageLoading ? (
      <>
        <Loading />
      </>
    ) : (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    )
  );
}

export default MyApp;
