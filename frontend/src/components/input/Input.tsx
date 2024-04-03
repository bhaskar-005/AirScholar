import  { Ref, useId } from 'react';
import { forwardRef } from 'react';
const Input = forwardRef(function Input({
    InputType,
    label,
    placeholder,
    classnameLabel,
    classnameInput,
    ...props
}:{
    InputType:string;
    label?:string;
    placeholder?:string;
    classnameLabel?:string;
    classnameInput?:string;
},ref: Ref<HTMLInputElement>){
   const id = useId();
    return (
<div>       {
        label &&( 
        <label 
        className={`block mb-2 text-[14px] font-medium text-gray-700 ${classnameLabel}`} 
        htmlFor={id}>{label}</label>
        )}

        <input 
        className={`py-3 px-4 w-full border-[1px] border-gray-400 text-[16px] font-[400] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none ${classnameInput}`}
        placeholder={placeholder} 
        type={InputType} 
        id={id} 
        {...props}
        ref={ref}
        />
    </div>
  );
})

export default Input;
