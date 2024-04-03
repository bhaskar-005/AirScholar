import  { useState } from 'react';
import BlueButton from '../components/buttons/BlueButton';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/api-function/auth-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/Store';


const ForgotPassword = () => {
    const [sendEmail , setsendEmail] = useState<boolean>(false);
    const [email , setemail] = useState<string>('');
    const {loading} = useSelector((state:RootState)=>state.auth);
    
    const dispatch = useDispatch();
    function handleOnSubmit (){
        forgotPassword(email , dispatch , setsendEmail);
    }

  return (

    <div className='flex justify-center items-center mt-[80px]'>
        <div className='max-w-[1260px] flex justify-center'>
           {
            loading ? (
              <div className="flex items-center justify-center h-screen">
              <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-12 w-12"></div>
            </div>
            
            ):(
              <div className='lg:w-[50%] w-[90%] flex flex-col border gap-6 sm:p-10 p-4 rounded-md'>
              <h1 className='sm:text-[30px] text-[27px] font-bold text-blue-800 '>{
                  !sendEmail ? "Reset Password" : 'Check your email'
                  }
              </h1>
  
              <p className='text-[16px] font-[500] text-gray-600'>
                  {
                      !sendEmail ? (
                          "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                      ):(
                          `We have sent the reset email to your email address. Please check your inbox, and if you don't see it, also check your spam folder ${email}`
                      )
                  }
              </p>
            <form 
             action=""
             className='flex flex-col gap-5' 
             onSubmit={handleOnSubmit}
             >
              {
                  !sendEmail &&(
                      <label >
                        <p className='text-[14px] font-[600]'>Enter Email <span className='text-red-800'>*</span></p> 
                       <input 
                       onChange={(e)=>setemail(e.target.value)}
                       type="email" 
                       placeholder='example@gmail.com'
                       className='py-3 px-4 w-full border-[1px] border-gray-600 text-[17px] font-[500] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none'
                       />
                     </label>
                  )
              }
              <BlueButton type='submit' text={!sendEmail ? "Sumbit" : "Resend Email"}/>
            </form>
            {/* go back button */}
            <Link to={'/login'}>
            <div className='flex items-center gap-1'>
             <IoMdArrowRoundBack />
              <p className='text-[15px] font-[600]'>Back To Login</p>
             </div>
            </Link>
            </div>
            )
           }
        </div>
    </div>
  );
}

export default ForgotPassword;
