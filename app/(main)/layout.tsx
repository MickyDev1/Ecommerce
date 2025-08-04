import Navbar from '@/components/Navbar';
import React from 'react';
// import { ThemeProvider } from "@/components/theme-provider";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      
      <body>
        <Navbar />
        <div className='py-20'>{children}</div>
         
          {/* Navbar and main content wrapped by ThemeProvider */}
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
         
          {/* <div className=''>
           
          </div>
        </ThemeProvider> */}
          
      </body>
    </html>
  );
};

export default Layout;