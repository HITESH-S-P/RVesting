import { color } from "framer-motion";

function Footer() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          fontcolor: "white",
          color: "white",
          backgroundColor: "#1a1a1a",
        }}
      >
        <span style={{ margin: "0 15px" }}>JERIN P ISAC</span>
        <span style={{ margin: "0 15px" }}>HITESH S P</span>
        <span style={{ margin: "0 15px" }}>HEMANTH MEDAHAL</span>
      </div>
      <div className="footer">
        <label>&copy; All Rights reserved by RVesting</label>
      </div>
    </>
  );
}

export default Footer;
