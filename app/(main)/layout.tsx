import Navbar from "@/components/Navbar";
import React from "react";
// import { ThemeProvider } from "@/components/theme-provider";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <div className="py-20">
        {children}
      </div>

      {/* Example if using ThemeProvider */}
      {/* 
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <div className="py-20">
          {children}
        </div>
      </ThemeProvider>
      */}
    </>
  );
};

export default Layout;
