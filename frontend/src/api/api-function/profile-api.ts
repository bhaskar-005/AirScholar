import toast from "react-hot-toast";
import { axiosCall } from "../axios-instence";
import { settingsEndpoints } from "../api-endpoint";
import { setUser } from "../../redux/slice/ProfileSlice";


//update profile pic
export const profilePhotoUpdate = async(data:any,token:any,dispatch:Function)=>{
    try {
        const res = await axiosCall(
            "post",
            settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
            {data},{
                access_token:token,
            }
        )
        if (res.status==200) {
            console.log(res);
            toast.success('profile photo updated.')
            // dispatch(setUser())
        }

    } catch (error) {
        console.log(error);
        toast.error(error.message);
        
    }
}

//update profile
export const updateProfileInfo = async(data:any , token:any , dispatch:Function)=>{
  const toastId = toast.loading('updating ..')
  try {
    const res = await axiosCall(
        'post',
        settingsEndpoints.UPDATE_PROFILE_API,
        data,
        { access_token:token}
    )
    if(res.status == 200){
        toast.success('profile updated successfully');
        dispatch(setUser(res.data.data))
        
    }
  } catch (error) {
   console.log(error);
   toast.error('error White updating profile')
  }
 toast.dismiss(toastId)
}