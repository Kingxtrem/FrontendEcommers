import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-200 font-bold text-xs sm:text-base md:text-lg py-4 shadow-inner">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto px-4">
        <div className="mb-2 md:mb-0 text-center md:text-left">
          Follow me on:
        </div>
        <div className="flex gap-4 justify-center items-center">
          <a
            href="https://www.facebook.com/Kingxtrem2408"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xl"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/ig_kingxtrem/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-900 transition-colors duration-200 text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/itskingxtrem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-900 transition-colors duration-200 text-xl"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/kingshuk-tantubay/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.github.com/Kingxtrem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors duration-200 text-xl"
          >
            <FaGithub />
          </a>
        </div>
      </div>
      <div className="w-full text-center mt-2 text-gray-600">
        © {new Date().getFullYear()} TechCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
