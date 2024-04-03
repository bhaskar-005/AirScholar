import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container2 flex justify-center py-8">
      
        <div className="flex justify-between w-[1100px]">
          <p className="mt-8 text-[15px] text-gray-900 dark:text-gray-300 sm:mt-0">
            &copy; 2022. build from scratch by{" "}
            <Link className="font-[600]" to={"https://github.com/bhaskar-005"}>
              bhaskar bhandari
            </Link>
            .
          </p>
          <div className="flex gap-4 text-white">
            <Link to={'https://x.com/BsB02266322?t=56DmZEf-ILT0VReOtf1t7g&s=09'} target="_blank" ><FaXTwitter className="size-6 "/></Link>
            <Link to={'https://github.com/bhaskar-005'} target="_blank"><FaGithub  className="size-6 "/></Link>
          </div>
        </div>
       
      </footer>
  );
}

export default Footer;
