import toast from "react-hot-toast"
import { axiosCall } from "../axios-instence";
import { catalogData, courseEndpoints, profileEndpoints } from "../api-endpoint";
import { setCourse } from "../../redux/slice/courseSlice";
import { loading } from "../../redux/slice/authSlice";
import { setCourseContent, setViewCourse } from "../../redux/slice/viewCourseSlice";

export const CreateSection = async(data:object,token:any, dispatch:Function )=>{
   const toastId = toast.loading('loading..')
    try {
    const res = await axiosCall(
        'post',
         `${courseEndpoints.CREATE_SECTION_API}`,
         data ,{
            access_token: token
         }
    )
    if(res.status == 200){
        toast.success('section created successfully')
    }
    dispatch(setCourse(res.data.updateCourse));
    
   } catch (error) {
     console.log(error);
     toast.error('section not created')
   }
   toast.dismiss(toastId);
}


export const updateSection = async(data:object,token:any , dispatch:Function )=>{
    const toastId = toast.loading('loading..');
    try {
        const res = await axiosCall(
            'put',
            courseEndpoints.UPDATE_SECTION_API,
            data,
            {
                access_token:token
            }
        )
        if(res.status == 200){
            dispatch(setCourse(res.data.data));
            toast.success('section updated successfully')
        }
    } catch (error) {
     console.log(error);
     toast.error('section not created');
    }
    toast.dismiss(toastId);
}

export const deleteSection = async(data:object, token:any, dispatch:Function)=>{
    const toastId = toast.loading('loading..')
    try {
    const res = await axiosCall(
        'delete',
        courseEndpoints.DELETE_SECTION_API ,
        data,
        {
            access_token:token
        }
    )
    if(res.status == 200){
        dispatch(setCourse(res.data.data));
        toast.success('section removed successfully');
    }
   } catch (error) {
    console.log(error);
    toast.error('section not deleted');
   }
   toast.dismiss(toastId);
}

//create sebsection
export const createSubsection = async(data:object , dispatch:Function , token:any)=>{
   const toastId = toast.loading('Creating Subsection..')
    try {
        const res = await axiosCall(
            'post',
            courseEndpoints.CREATE_SUBSECTION_API,
            data,{
                access_token:token
            }
        )
        if (res.status ==200) {
            dispatch(setCourse(res.data.data));
            toast.success('course created successfully')
        }
    } catch (error) {
        console.log(error);
        toast.error('subsection creation error')
    }
    toast.dismiss(toastId);
}

// delete subsecntion
export const deleteSubsection = async(data:object , dispatch:Function , token:any)=>{
   const toastId = toast.loading('Create Subsection.')
    try {
        const res = await axiosCall(
            'delete',
            courseEndpoints.DELETE_SUBSECTION_API,
            data,{
                access_token:token
            }
        )
        if (res.status ==200) {
            dispatch(setCourse(res.data.data));
            toast.success('subsection removed')
        }
    } catch (error) {
        console.log(error);
        toast.error('subsection not deleted')
    }
    toast.dismiss(toastId);
}

//couse edit
export const editCourse = async (data:any,token:any,dispatch:Function,navigate:Function) => {
  const toastId = toast.loading('loading');
    try {
    const res = await axiosCall(
        'put',
        courseEndpoints.EDIT_COURSE_API,
        data,{
            access_token:token
        }   
    )
    if (res.status === 200)  {
        dispatch(setCourse(res.data.data));
        toast.success('course updated successfully');
        navigate('/dashboard/my-courses') 
        
    }
   } catch (error) {
    console.log(error);
    toast.error('failad to update course');
   }
   toast.dismiss(toastId)
}

//instructor corses
export const getInstructorCourses = async(dispatch:Function , token:any , setIsCourse:any)=>{
 dispatch(loading(true));
    try {
    const res = await axiosCall(
        'get',
        courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,
        null,
        {
        access_token:token,
        }
    )
    
    dispatch(loading(false));
    if (res.data.data.length == 0) {
        setIsCourse(true);
    }
    return res.data;
    
    
   } catch (error) {
    console.log(error);
    toast.error('failad to getInstructorCourses');
   }
   dispatch(loading(false));
}

//get all courses
export const getAllCourses = async(dispatch:Function)=>{
    dispatch(loading(true))
    try {
        const res = await axiosCall(
            'get',
            courseEndpoints.GET_ALL_COURSE_API,
            null,
        )
        if (res.status == 200) {
            dispatch(setCourse(res.data.data));
            dispatch(loading(false))
            
        }
    } catch (error) {
        console.log(error);
        toast.error('faild to get all courses')
    }
    dispatch(loading(false));
}


//find courses by category id
export const getCourseBycategoryId = async(categoryId:any ,setNoCourse:any)=>{
    
    try {
        const res = await axiosCall(
            'post',
            catalogData.CATALOGPAGEDATA_API,
             {categoryId}
        )
       
        if (res.status == 200) {
            if (res.data.category.courses.length == 0) {
                setNoCourse(true);
            }
            return res.data;
        }

    } catch (error) {
        toast.error('error while fetching courses');
        throw error;
    }
}

export const getCourseDetail = async(id:any )=>{
    try {
      const res = await axiosCall(
        'post',
         courseEndpoints.COURSE_DETAILS_API,
         {courseId:id}
      )  
      return res.data.data.findCourse;

    } catch (error) {
      console.log(error);
      toast.error('errow while fetching')
    }
}

//full access course
export const getFullAccessCourse = async(courseId:any,token:any,dispatch:Function   )=>{
    const toastId = toast.loading('fetching course')
    try {
        const res = await axiosCall(
            'post',
            courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {courseId},{
                access_token: token
            }
        )
        dispatch(setViewCourse(res.data.course));
        dispatch(setCourseContent(res.data.course.courseContent));
        toast.dismiss(toastId);
        return res.data.course;
    } catch (error) {
        console.log(error);
        toast.error('problem while fetching course')
    }
    toast.dismiss(toastId);
}

//instructor dashboard data 
export const instructorDashboard = async(token:any)=>{
    try {
        const res = await axiosCall(
            'get',
            profileEndpoints.GET_INSTRUCTOR_DATA_API,
            null,{
                access_token: token
            }
        )
        return res.data.courses;
        
    } catch (error) {
        console.log(error);
        toast.error('problem while fetching instructor data')
    }
}