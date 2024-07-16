import { BiAt, BiHeart, BiPhone } from "react-icons/bi";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer id="contact" className="flex flex-col md:h-[40vh] items-center justify-center px-10 md:px-20 py-8 bg-[#FEDD58] dark:bg-neutral-800">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-8 text-xl text-neutral-900 h-full w-full bg-neutral-100 dark:bg-neutral-400 rounded">
          <div className="flex flex-col justify-around items-center max-h-[15vh]">
            <h2>Call</h2>
            <BiPhone className="text-3xl text-[#FEDD58] dark:text-green-300"/>
            <a href="tel: +919140254220 "><h2>+91 9140254220</h2></a>
          </div>
          <div className="flex flex-col justify-around items-center max-h-[15vh]">
            <h2>Email</h2>
            <BiAt className="text-3xl text-[#FEDD58] dark:text-green-300"/>
            <a href="mailto: business@limeinfusion.com"><h2>business@limeinfusion.com</h2></a>
          </div>
          <div className="flex flex-col justify-around items-center max-h-[15vh]">
            <h2>Follow</h2>
            <BiHeart className="text-3xl text-[#FEDD58] dark:text-green-300 mb-1"/>
            <div className="flex justify-between w-20 text-neutral-800">
              <a href="https://www.instagram.com/limeinfusion/" target="_blank"><BsInstagram/></a>
              <a href="https://www.linkedin.com/company/limeinfusion/" target="_blank"><BsLinkedin/></a>
              <a href="https://www.facebook.com/limeinfusion/" target="_blank"><BsFacebook/></a>
            </div>
        </div>
        </div>
        <p className="mt-5 dark:text-neutral-200">All rights reserved @ Lime Infusion</p>
      </footer>
    </>
  );
};

export default Footer;
