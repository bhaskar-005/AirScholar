import { useNavigate } from "react-router-dom";

const BlueButton = ({
  className,
  href,
  text,
  textColor = 'text-white',
   type,
   onClick,
}: {
  className?: string;
  href?: any;
  text: string;
  type?: any;
  textColor?: string;
  onClick?:any;
}) => {
  const navigate = useNavigate();
  
  return (
    <button
      type={type}
      onClick={onClick ? onClick : () => navigate(href)}
      className={`bg-blue-600 rounded-md px-[20px] py-[10px] text-[15px] ${textColor} font-[500] hover:bg-blue-700 transition-all duration-100 hover:scale-95 ${className}`}
    >
      {text}
    </button>
  );
};

export default BlueButton;
