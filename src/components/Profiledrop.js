import React, { use } from "react";
import image from "../assets/img.jpg";
import Link from "next/link";
import { useContext } from "react";
import UserContext from "../context/userContext";

function Profiledrop(props, ref) {
  const { userData, handleLogout } = useContext(UserContext);
  console.log(userData);

  return (
    <div ref={ref} className="dropdownheader">
      <ul>
        <label>
          <img src={image} alt="" />
          <h2>{userData?.name ? userData.name : null}</h2>
        </label>
        <hr />
        <li>
          <Link href="/profilePage">
            <i className="fa fa-user"></i>
            <h3>Profile</h3>
          </Link>
        </li>
        <li>
          <Link href="">
            <i className="fa fa-sign-out"></i>
            <h3 onClick={handleLogout}>Sign Out</h3>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default React.forwardRef(Profiledrop);
