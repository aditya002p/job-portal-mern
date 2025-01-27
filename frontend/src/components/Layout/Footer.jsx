import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
function Footer() {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved by Aditya.</div>
      <div>
        <Link to={"https://github.com/aditya002p"} target="github">
          <FaGithub></FaGithub>
        </Link>
        <Link to={"https://leetcode.com/u/Adip002p/"} target="leetcode">
          <SiLeetcode></SiLeetcode>
        </Link>
        <Link
          to={"https://www.linkedin.com/in/aditya-kumar-pathak-6870001b2/"}
          target="linkedin"
        >
          <FaLinkedin></FaLinkedin>
        </Link>
        <Link to={"instagram"} target="instagram">
          <RiInstagramFill></RiInstagramFill>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;