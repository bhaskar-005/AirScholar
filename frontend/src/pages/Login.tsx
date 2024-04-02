import React from 'react';
import Input from '../components/input/Input';
import { useForm, SubmitHandler } from "react-hook-form";
import BlueButton from '../components/buttons/BlueButton';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/api-function/auth-api';
import { useDispatch } from 'react-redux';

const Login = () => {
  type Inputs = {
  
    email:string;
    password:string
   
  }
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //onsubmit function
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data , navigate , dispatch);
  }
  return (
    
    <div className='flex justify-center mt-[90px]  '>
      <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col lg:w-[25%] w-[80%] gap-3'>
    
     
      <Input 
      InputType={'email'} 
      label={'Email *'}
      placeholder={'Enter email'}
      {...register("email",{required:true}) } />
      {errors.email ? <span className='text-[12px] text-red-600'>Email is required</span>: null}
     
      <Input 
      InputType={'password'} 
      label={'Password *'}
      placeholder={'Enter password'}
      {...register("password",{required:true}) } />
      {errors.password ? <span className='text-[12px] text-red-600'>Your password is empty  .</span>: null}
       <div className='flex justify-between'>
      <Link to={'/signup'}><div className='text-blue-900 font-[500] sm:text-[14px] text-[13px] hover:underline'>don't have a account?</div></Link>  
       <Link to={'/forgotpassword'}><div className='text-blue-900 font-[500] sm:text-[14px] text-[13px] hover:underline'>forgot password</div></Link>
       </div> 
       <BlueButton type={'submit'} text={'Log In'} className={'mt-5'}/>
    </form>
    </div>
    
)
}

export default Login;
