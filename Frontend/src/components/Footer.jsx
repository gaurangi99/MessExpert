import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{position:"fixed", bottom:"0" ,margin:"auto"}} >
      <p>Copyright ⓒ {currentYear}</p>
    </footer>
  );
}

export default Footer;

// style={{position:"fixed", bottom:"0"}}