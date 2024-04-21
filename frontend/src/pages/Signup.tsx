import Input from '../components/input/Input';
import { useForm, SubmitHandler } from "react-hook-form";
import BlueButton from '../components/buttons/BlueButton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSignUpData } from '../redux/slice/authSlice';
import { sendOtp } from '../api/api-function/auth-api';
import toast from 'react-hot-toast';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { RootState } from '../redux/store/Store';
import LoadingFullscreen from '../components/LoadingFullscreen';


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state:RootState)=>state.auth.loading);
  type Inputs = {
    firstName: string;
    lastName: string;
    email:string;
    password:string
    confirmPassword: string;
    accountType:string
  }
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  //onsubmit function
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (data.password != data.confirmPassword) {
      toast.error('passwords do not match');
      return
    }
    dispatch(setSignUpData(data));
    sendOtp(data.email ,navigate, dispatch);
    
  }
  return (
    <>
      {loading && <LoadingFullscreen />}
      <MaxWidthWrapper>
        <div className={`flex justify-center mt-[90px] ${loading ? 'pointer-events-none' : ''}`}>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col lg:w-[40%] w-[80%] gap-3'>
            <div className='flex flex-row justify-between gap-2'>
              <Input 
                InputType={'text'} 
                label={'First Name *'}
                placeholder={'Enter first name'}
                {...register("firstName", { required: true })}
              />
              <Input 
                InputType={'text'} 
                label={'Last Name *'}
                placeholder={'Enter last name'}
                {...register("lastName", { required: true })}
              />
            </div>
            {errors.firstName && <span className='text-[12px] text-red-600'>Firstname is required</span>}
            {errors.lastName && <span className='text-[12px] text-red-600'>Lastname is required</span>}
             
            <Input 
              InputType={'email'} 
              label={'Email *'}
              placeholder={'Enter email'}
              {...register("email", { required: true })}
            />
            {errors.email && <span className='text-[12px] text-red-600'>Email is required</span>}
             
            <Input 
              InputType={'password'} 
              label={'Password *'}
              placeholder={'Enter password'}
              {...register("password", { required: true, minLength: 10 })}
            />
            {errors.password && <span className='text-[12px] text-red-600'>Password must be at least 10 characters long.</span>}
           
            <Input 
              InputType={'password'} 
              label={'Confirm password *'}
              placeholder={'Enter password again'}
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && <span className='text-[12px] text-red-600'>Password must be at least 10 characters long.</span>}
    
            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  id="instructor"
                  value="instructor"
                  className="mr-2"
                  {...register('accountType')}
                />
                <span>Instructor</span>
              </label>
    
              <label className="flex items-center">
                <input
                  type="radio"
                  id="student"
                  value="student"
                  className="mr-2"
                  {...register('accountType')}
                />
                <span>Student</span>
              </label>
            </div>
    
            <Link to='/login'><div className='text-blue-900 font-[500] sm:text-[14px] text-[13px] hover:underline'>Already have an account?</div></Link>
        
            <BlueButton type='submit' text='Register' className='mt-5' />
          </form>
        </div>
      </MaxWidthWrapper>
    </>
  );
}  

export default Signup;
