import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='sticky bottom-0 bg-gray-200 font-bold w-auto flex-col justify-items-centercenter items-center text-[10px] sm:text-xl'>
            <div className='w-full text-center'> Follow me on:</div>
            <div className='mx-auto text-center w-auto gap-1 flex justify-evenly items-center'>
                <a href="https://www.facebook.com/Kingxtrem2408" target="_blank" rel="noopener noreferrer" className=' text-blue-500 hover:text-blue-700 flex justify-center items-center'><FaFacebook />Facebook</a>
                <a href="https://www.instagram.com/ig_kingxtrem/" target="_blank" rel="noopener noreferrer" className=' text-blue-500 hover:text-blue-700 flex justify-center items-center'><FaInstagram />Instagram</a>
                <a href="https://x.com/itskingxtrem" target="_blank" rel="noopener noreferrer" className=' text-blue-500 hover:text-blue-700 flex justify-center items-center'><FaTwitter />Twitter</a>
                <a href="https://www.linkedin.com/in/kingshuk-tantubay/" target="_blank" rel="noopener noreferrer" className=' text-blue-500 hover:text-blue-700 flex justify-center items-center'><FaLinkedin />LinkedIn</a>
                <a href="https://www.github.com/Kingxtrem" target="_blank" rel="noopener noreferrer" className=' text-blue-500 hover:text-blue-700 flex justify-center items-center'><FaGithub />GitHub</a>
            </div>
            <div className='w-full text-center'>© {new Date().getFullYear()} TechCart. All rights reserved.</div>
        </div>
    )
}

export default Footer
