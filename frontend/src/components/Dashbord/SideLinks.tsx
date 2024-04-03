import { Link, matchPath, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc"

const SideLinks = ({
  text,
  icon,
  path,
  
}: {
  text: string;
  icon: string;
  path: string;
  
}) => {
  //icon imported form react icons
  const Icon = (Icons as any)[icon];
  const location = useLocation();

  //for matching the path 
  const matchRoute = (slug: string) => {
    return matchPath({ path: slug }, location.pathname);
  };
  return (
    <Link
      to={path}
      key={text}
      className={`${matchRoute(path) ? "text-[#00003d]" : "text-black"}`}
    > 
    <div key={path} className="flex lg:flex-row flex-col w-full justify-between">
      <div className={`${matchRoute(path) ? "bg-blue-300 bg-opacity-50 transition-all duration-200" : "text-black"} flex lg:flex-row flex-col gap-3 items-center p-[12px] text-[16px] font-[400] w-full`}>
       <div className="sm:text-[17px] text-[24px]"><Icon/></div> 
         <div className=" text-[16px] sm:flex hidden">{text}</div>
      </div>
      <div className={`${matchRoute(path) ? "w-[4px] bg-blue-400 transition-all duration-200" : null}`}></div>
      </div>
    </Link>
  );
};

export default SideLinks;
