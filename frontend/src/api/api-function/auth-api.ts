import { axiosCall } from "../axios-instence"
import {categories, contactusEndpoint, courseEndpoints, endpoints, ratingsEndpoints} from '../api-endpoint'
import toast from "react-hot-toast";
import { SetCategory, loading, setToken } from "../../redux/slice/authSlice";
import { setUser } from "../../redux/slice/ProfileSlice";
import { setCourse, setStep } from "../../redux/slice/courseSlice";
import { tempCategory } from "../../data/NavbarLinks";


//refreshToken
export const refreshToken = async(token:any , dispatch:Function)=>{
  dispatch(loading(true));
  try {
    const res = await axiosCall(
      'post',
      endpoints.refreshToken,
      {token}
    )
    dispatch(setUser(res.data.findUser));
   } catch (error:any) {
    console.log(error);
    if (error.response.status == 500) {
       toast.error('token expired');
       dispatch(setToken(null));
       localStorage.removeItem(token);
    }
   }
   dispatch(loading(false));
}

//send opt function
export const sendOtp = async (email: string, navigate:Function, dispatch:Function) => {
    dispatch(loading(true));
    try {
    await axiosCall('post', endpoints.SENDOTP_API, {
      email,
      checkUserPresent: true,
    });

    dispatch(loading(false));
    toast.success("OTP Sent Successfully");
    navigate('/verify-email');

  } catch (error:any) {
    dispatch(loading(false));
    toast.error(`${error.response.data.message}`);
    throw new Error('Error sending OTP:');
  }
};


export const signUp = async (data: any, navigate:Function , dispatch:Function) => {
    dispatch(loading(true));
    try {        
    await axiosCall('post', endpoints.SIGNUP_API, data);

    toast.success("signup successful");
    navigate('/login');

  } catch (error) {
    toast.error ('not able to signup')
    console.log(error);
      
}
  dispatch(loading(false));
};


export const login = async (data: any, navigate:Function , dispatch:Function) => {
    dispatch(loading(true));
    try {        
    const res = await axiosCall('post', endpoints.LOGIN_API, data,
    {
        headers: {
            Credential: true,
          },
    });
    localStorage.setItem('token',res.data.token);
    dispatch(setToken(res.data.token))
    dispatch(setUser(res.data.User))
    toast.success(res.data.message);
    navigate('/dashboard/profile');
    
  } catch (error) {
    toast.error ('not able to login')
    console.log(error);
      
}
  dispatch(loading(false));
};

export const forgotPassword = async(email:string,dispatch:Function ,setsendEmail:Function)=>{
  dispatch(loading(true));
  try {
    const res = await axiosCall(
      'post',
       endpoints.RESETPASSTOKEN_API,
       {email}
    )
    toast.success(res.data.message);
    if (res.data.success) {
      setsendEmail(true);
    }
   } catch (error:any) {
    console.log(error);
    toast.error(error.response.data.message);
   }
   dispatch(loading(false))
}

export const resetPassword = async(data:any , navigate:Function , dispatch:Function)=>{
  dispatch(loading(true)) ;
  try {
      if (data.password != data.confirmPassword) {
         toast.error('Password is not matching');
         return
      }
       const res = await axiosCall(
        'post',
        endpoints.RESETPASSWORD_API,
        data,
       )
       if (res.status == 200) {
          navigate('/login');
          toast.success('Password reset successfully, now you can login');
       }
    } catch (error:any) {
      console.log(error);
      toast.error(error.response.data.message) 
    }
    dispatch(loading(false));
}


export const getCategory = async(dispatch:Function)=>{
   try {
    dispatch(SetCategory(tempCategory));
    const res = await axiosCall(
      'get',
      categories.CATEGORIES_API
    )
    dispatch(SetCategory(res.data.data));
    
   } catch (error) {
     console.log(error);
     dispatch(SetCategory(tempCategory));
   }
}



//craete course
export const CreateCourseFunction = async(data:any , token:any ,dispatch:Function)=>{
 const toastId = toast.loading('loading..')
  try {
    const res = await axiosCall(
      'post',
      courseEndpoints.CREATE_COURSE_API,
      data,
      {
        access_token: token,
      }
    )
    if (res.status == 200) {
      toast.success('course created successfully') 
      dispatch(setCourse(res.data.data));
      dispatch(setStep(2));
    }
  } catch (error) {
    console.log(error);
    toast.error('course not created')
  }
  toast.dismiss(toastId);
}

export const ContectForm = async (data:any)=>{
  const toastId = toast.loading('Sending Mail ..');
  try {
    const res = await axiosCall(
      'post',
      contactusEndpoint.CONTACT_US_API,
      data
    )
   if(res.status == 200){
    toast.success('Mail sent successfully')
    toast.dismiss(toastId)
    return res
   }
  } catch (error) {
    console.log(error);
    toast.error('error white sending mail')
  }
  toast.dismiss(toastId);
}

export const createRatingReview = async(data:any, token:any)=>{
  const toastId = toast.loading('loading ..');
  try {
    const res = await axiosCall(
      'post',
       ratingsEndpoints.CREATE_RATING_API,
       data ,{
        access_token: token,
      }
    )
    if (res.status === 200) {
      toast.success('Rating Reviews Added .');
      toast.dismiss(toastId);
      return res;
    }
  } catch (error:any) {
    toast.error(error.response.data.message)
    console.log(error);
  }
  toast.dismiss(toastId);
}
