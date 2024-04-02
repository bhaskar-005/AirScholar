import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import BlueButton from '../components/buttons/BlueButton';
import { signUp } from '../api/api-function/auth-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/Store';
import { useNavigate } from 'react-router-dom';


const OtpValidation = () => {
    const [EmailOtp, setOtp] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { signUpdata } = useSelector((state: RootState) => state.auth);
 
    useEffect(()=>{
       if (!signUpdata) {
        navigate('/signup')
       }
    },[])
    const handleVerifyEmail = (e:any)=>{
        e.preventDefault();
       const data ={...signUpdata,EmailOtp};
       console.log(data);
       signUp(data,navigate,dispatch)
    }
  return (
    <div className='flex items-center justify-center h-screen sm:mx-2'>
    <div className='bg-blue-50 p-8 rounded-md w-full max-w-md border-2 border-slate-200'>
      <h1 className="text-2xl font-bold mb-4">Enter 6-Digit OTP</h1>

      <form className="text-black" onSubmit={handleVerifyEmail}>
        <OtpInput
          value={EmailOtp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span> </span>}
          inputStyle={{
            color: 'black',
            backgroundColor: '#f0f4f8',
            padding: '10px',
            width: '3rem',
            fontSize: '1rem',
            
        }}
          renderInput={(props) => (
            <input 
              {...props}
              className='p-[10px] border-2 border-blue-200 bg-slate-50 text-black rounded-[5px] px-5 sm:px-6 mr-[7px] text-center'
              placeholder='_'
            />
          )}
        />
        <br />
        {EmailOtp.length === 6 && <BlueButton text={'Verify Email'} type={'submit'} />}
      </form>
      <p className="mt-4 text-slate-600">Check your email for the OTP code.</p>
    </div>
  </div>
  );
}

export default OtpValidation;
