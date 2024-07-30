import Input from '../components/input/Input';
import { useForm, SubmitHandler } from "react-hook-form";
import BlueButton from '../components/buttons/BlueButton';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/api-function/auth-api';
import { useDispatch, useSelector } from 'react-redux';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { RootState } from '../redux/store/Store';
import LoadingFullscreen from '../components/LoadingFullscreen';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CgClose } from 'react-icons/cg';
import copy from 'clipboard-copy'
import { BiCopy } from 'react-icons/bi';

const Login = () => {
  const loading = useSelector((state:RootState)=>state.auth.loading);
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

  useEffect(()=>{
    toast.custom((t)=>(
      <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-end mb-2">
        <button onClick={() => toast.dismiss(t.id)} className="text-gray-400 hover:text-gray-600">
          <CgClose className="w-5 h-5" />
        </button>
      </div>
      
      <h2 className="text-2xl font-bold mb-4 text-blue-600">👋 Try Demo Accounts</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Student Account</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span className="text-sm">Email: <strong>student@demo.com</strong></span>
              <button onClick={() => copy('student@demo.com')} className="text-blue-500 hover:text-blue-700">
                <BiCopy className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span className="text-sm">Password: <strong>test 123</strong></span>
              <button onClick={() => copy('test 123')} className="text-blue-500 hover:text-blue-700">
                <BiCopy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Instructor Account</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span className="text-sm">Email: <strong>instructor@demo.com</strong></span>
              <button onClick={() => copy('instructor@demo.com')} className="text-blue-500 hover:text-blue-700">
                <BiCopy className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span className="text-sm">Password: <strong>test 123</strong></span>
              <button onClick={() => copy('test 123')} className="text-blue-500 hover:text-blue-700">
                <BiCopy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-gray-600 text-center">
        Use these accounts to explore all features!
      </p>
    </div>
    ),{
      duration: Infinity,
      position: 'top-right',
      style: {
        background: '#2FAB73',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    }
  )
  },[])
  return (
    <>
    {loading && <LoadingFullscreen/>}
    <MaxWidthWrapper>
    <div className='flex justify-center mt-[90px]  '>
      <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col lg:w-[40%] w-[80%] gap-3'>
    
     
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
    </MaxWidthWrapper>
    </>
)
}

export default Login;
