import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook />, href: "https://www.facebook.com/Kingxtrem2408", color: "hover:text-blue-600" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/ig_kingxtrem/", color: "hover:text-pink-500" },
    { icon: <FaXTwitter />, href: "https://x.com/itskingxtrem", color: "hover:text-black" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/kingshuk-tantubay/", color: "hover:text-blue-700" },
    { icon: <FaGithub />, href: "https://www.github.com/Kingxtrem", color: "hover:text-gray-900" },
  ];

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-8 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">


          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-black tracking-tight text-gray-900">
              Tech<span className="text-blue-600">Cart</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">Elevating your tech experience.</p>
          </div>


          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Connect With Me
            </span>
            <div className="flex gap-5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl text-gray-400 transition-all duration-300 transform hover:-translate-y-1 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>


        <div className="mt-8 pt-6 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} TechCart. Built with ❤️ by Kingshuk.
          </p>
          <div className="flex gap-6 text-xs font-medium text-gray-500">
            <span className="text-gray-400">Privacy Policy</span>
            <span className="text-gray-400">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;