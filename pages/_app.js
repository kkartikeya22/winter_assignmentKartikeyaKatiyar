// pages/_app.js
import '../styles/layout.css';  // Import your global CSS file
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />  {/* Render the page content */}
    </>
  );
}

export default MyApp;
