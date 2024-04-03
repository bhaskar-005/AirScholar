import Input from '../components/input/Input';
import { useForm, SubmitHandler } from "react-hook-form";
import BlueButton from '../components/buttons/BlueButton';
import {  useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../api/api-function/auth-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/Store';
import Loading from '../components/Loading';


type Inputs = {
    password: string
    confirmPassword: string
  }

const ResetPassword = () => {
    const locaton = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((state:RootState)=>state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) =>{
         const newdata = {...data,token:locaton.id};
         resetPassword(newdata ,navigate,dispatch );
      }

  return (
    <div>
      {
        loading ? (
            <Loading/>
        ):(
            <form  onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-[25px] font-[600]'>Reset Your Password</h2>
             <p>make a strong password</p>
            <Input
             label={'New Password *'}
             InputType='Password'
             {...register('password',{required: true , minLength:8})}
             />
             {
              errors.password && <span className='text-red-500'>Your password should be at least 10 characters long</span>
             }
      
             <Input 
             label={'ConfirmPassword *'}
             InputType='password'
             {...register('confirmPassword',{required:true ,minLength:8})}
             />
               {
              errors.password && <span className='text-red-500'>Your password should be at least 10 characters long</span>
             }
      
             <BlueButton text= 'change password' type={'submit'}/>
            </form>
        )
      }
    </div>
  );
}

export default ResetPassword;
