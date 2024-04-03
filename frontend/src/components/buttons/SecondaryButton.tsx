import { useNavigate } from 'react-router-dom';

const SecondaryButton = ({className , href , text , onClick}:{
    className?: string;
    href?: any;
    text: string;
    onClick?: () => void;
}) => {
    const navigate = useNavigate();
  return (
     <button 
      onClick={onClick? onClick: ()=> navigate(href)}
      className={`bg-gray-200 rounded-md py-[10px] px-[20px] text-[15px] font-[500] hover:bg-slate-100 hover:scale-95 duration-150 flex justify-center items-center gap-1 ${className}`}>
     {text}
    </button>
  );
}

export default SecondaryButton;
