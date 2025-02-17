import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function MainPage(props, ref) {
  const { onExploreClick } = props;

  return (
    <div ref={ref} className="mainpage">
      <div className="mid">
        <div className="head">
          <ul>
            <li>
              <label>Portfolio</label>
            </li>
            <li>
              <label>Management System</label>
            </li>
          </ul>
        </div>
        <div className="subhead">
          <label>
            A revolutionary digital solution for managing your portfolio for
            <br />
            Crypto
          </label>
        </div>
        <Link
          href="/about"
          scroll={false}
          onClick={(e) => {
            e.preventDefault();
            onExploreClick("about");
          }}
        >
          <button className="exp">Explore</button>
        </Link>
        <Link href="/RegisterPage">
          <button className="lgs">
            Let's Get Started
            <i>
              <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </i>
          </button>
        </Link>
      </div>
      <div className="image">
        <img
          src="/logo.png"
          alt="Logo"
          // style={{
          //   width: "500px",
          //   height: "500px",
          //   borderRadius: "25px",
          // }}
        />
      </div>
    </div>
  );
}

export default React.forwardRef(MainPage);
