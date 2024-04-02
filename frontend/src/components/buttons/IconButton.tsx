import React from "react";
import { Link } from "react-router-dom";

const IconButton = ({
  text,
  path ,
  childern,
  className,
  onClick,
  type ,
}: {
  text: string;
  path?: any;
  childern: React.ReactNode ;
  className?: string;
  onClick?: any;
  type?:any;
}) => {
  
  return (
    <Link to={path}>
      <button 
        onClick={()=> onClick()}
        className={`flex bg-blue-700 py-2 px-5 items-center text-white text-[16px] rounded-[6px] font-[500] gap-2 ${className}`}
        type={type}>
        <p>{text}</p>
        {childern}
      </button>
    </Link>
  );
};

export default IconButton;
