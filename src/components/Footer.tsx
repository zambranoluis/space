"use client";

import Link from "next/link";
import { Image } from "@heroui/image";

import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const socials = [
  {
    id: 1,
    title: "Facebook",
    link: "#F",
    icon: <FaFacebookSquare />,
  },
  {
    id: 2,
    title: "Instagram",
    link: "#I",
    icon: <FaInstagram />,
  },
  {
    id: 3,
    title: "Twitter",
    link: "#T",
    icon: <FaXTwitter />,
  },
  {
    id: 4,
    title: "Linkedin",
    link: "#L",
    icon: <FaLinkedin />,
  },
];

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center md:justify-between h-[55vh] bg-[#848d5a] md:py-16 md:px-24 max-md:gap-8">
      <Link
        id="top"
        className="flex bgred-300 max-md:place-self-center md:place-self-start justify-center md:justify-start items-center"
        href="/"
      >
        <Image
          className="w-full max-w-[300px] bgrose-700"
          src="https://github.com/BPM94/SCCTMD/raw/main/logos/RedezignitLogoWeb.png"
          alt="logo"
        />
      </Link>
      <div
        id="bottom"
        className="flex max-md:flex-col max-md:text-center md:justify-between items-center max-md:gap-8 "
      >
        <div id="ctaLogin" className="text-white">
          <p>Click here to continue with the design process.</p>
          <Link className="" href={"/"}>
            https://www.spacecreations.net
          </Link>
        </div>
        <div id="socials" className="flex gap-3 max-sm:px-2">
          {socials.map((social) => (
            <Link
              className="bg-white rounded-full p-2 text-2xl sm:text-4xl text-[#848d5a]"
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
