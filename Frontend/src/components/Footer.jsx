import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
      // {{position:"fixed", bottom:"0" ,margin:"auto"}}
    <footer data-testid="footer" style={{textAlign:"center",color:"black",opacity:"0.6",width:"100%",margin:"0",position:"fixed",bottom:"0",padding:"0.5"}}>
      <p>Copyright ⓒ {currentYear}</p>
    </footer>
  );
}

export default Footer;

// style={{position:"fixed", bottom:"0"}}