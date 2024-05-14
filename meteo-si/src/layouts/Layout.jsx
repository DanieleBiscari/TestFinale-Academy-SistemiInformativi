import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useOutlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { findUserByCookie } from "../utils/findUserByCookie";

const Layout = () => {
  const outlet = useOutlet();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const user = findUserByCookie();
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="py-4">{outlet}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
