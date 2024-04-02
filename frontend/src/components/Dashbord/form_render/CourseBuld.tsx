import { useForm, SubmitHandler } from "react-hook-form"
import Input from "../../input/Input"
import BlueButton from "../../buttons/BlueButton"
import { useState } from "react"
import { CreateSection, updateSection } from "../../../api/api-function/coures-api"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store/Store"
import SectionSubsuction from "./SectionSubsuction"
import toast from "react-hot-toast"
import { setStep } from "../../../redux/slice/courseSlice"


const CourseBuld = () => {
  type Inputs = {
    Section: string
  }
  const [editSection , setEditSection] = useState<any>(null);
  const [editSectionName , setEditSectionName] = useState('');

  const {course} = useSelector((state:RootState)=>state.course);
  const {token} = useSelector((state:RootState)=>state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()
  //onsubmit function
  const onSubmit: SubmitHandler<Inputs> = async(data) =>{
    if (editSection) {
        if (data.Section == editSectionName) {
          toast.error('no changes were made');
          return
        }
        await updateSection({
           sectionName:data.Section, 
           sectionId:editSection,
           courseId:course._id},
           token,
           dispatch,
          )
          setValue('Section','');
          setEditSection(null);
          setEditSectionName('');
      }
      else{
        await CreateSection(
          {sectionName:data.Section, courseId:course._id} ,
           token ,
           dispatch
           );
        setValue('Section','');
      }
    }
    const editSectionFunction = (sectionId:string , sectionName:string)=>{
      //after clicking again on edit button edit value will be removed  
      if (editSection == sectionId) {
            setValue('Section','');
            setEditSection(null);
         }
         //put the value of section id in edit section now its no more null
         setEditSection(sectionId);
         setEditSectionName(sectionName);
         setValue('Section',sectionName);
    }
     
    const cancelEdit = ()=>{
      setValue('Section','');
      setEditSection(null);
    }

    //public course
    const CoursePublic = ()=>{
      if (course.courseContent.length == 0) {
        toast.error('At least add one section');
        return;
      }
      if (course.courseContent.some((section:any) => section.subSection.length === 0)) {
        toast.error('Add at least one lecture');
        return;
      }
      dispatch(setStep(3));
    }
  return (
    <div className='bg-gray-100 shadow-md sm:p-[20px] p-[10px] border rounded-md flex flex-col gap-2'>  
        <div className="flex justify-between">
          <div className="text-[17px] font-[600]">Course Builder</div>
           
            <button
            className={`${editSection?'font-[600] text-gray-600 hover:underline hover:text-gray-800':'hidden'}`}
            onClick={()=>cancelEdit()}
            >cancel edit</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input 
          InputType="text" 
          placeholder={'Section name'} 
          label={'Section *'} 
          {...register('Section',{required:true})}
          />
          {errors.Section && <span className="text-red-600">Section name is required</span>}
         <BlueButton
          text={editSection ? 'Update Section': 'Create Section'}
          type={'submit'}
          />
       </form>
       {
        course.courseContent.length > 0 && (
          <SectionSubsuction editSectionFunction={editSectionFunction}/>
        )
       }
      
       <div className="w-full flex justify-end mt-5">
        <BlueButton text={"Next"} onClick={()=>CoursePublic()} />
       </div>
    </div>
  );
}

export default CourseBuld;