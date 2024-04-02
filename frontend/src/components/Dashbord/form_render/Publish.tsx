import { useForm, SubmitHandler } from "react-hook-form"
import BlueButton from "../../buttons/BlueButton"
import SecondaryButton from "../../buttons/SecondaryButton"
import { useDispatch, useSelector } from "react-redux"
import { setCourse, setStep } from "../../../redux/slice/courseSlice"
import { RootState } from "../../../redux/store/Store"
import { editCourse } from "../../../api/api-function/coures-api"
import { useNavigate } from "react-router-dom"

type Inputs = {
  status: string
}

const Publish = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {course} = useSelector((state:RootState)=>state.course);
  const {token} = useSelector((state:RootState)=>state.auth);
  //onsubmit funciton
  const onSubmit: SubmitHandler<Inputs> = async(data) =>{ 
  
    const newData ={
    ...data,
    couresName:course.couresName,
    courseId :course._id,
    courseDescription:course.courseDescription,
    whatYouWillLearn:course.whatYouWillLearn,
    price:course.price,
    categoryId:course.category,
    thumbnail:course.thumbnail
    }
    
    await editCourse(newData,token,dispatch,navigate);
    dispatch(setStep(1));
    dispatch(setCourse(null));
  }

  return (
    <div className='bg-gray-100 border-[1px] border-gray-300 rounded-md shadow-md p-6'>
     <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-[15px] font-[500] text-gray-600">Making your course accessible to the public will help more people discover and engage with the content.</p>
        <div className="flex flex-row gap-2 items-center py-6 ">
        <input  
        type="checkbox" 
        id="myCheck" 
        value={'Published'}
        className="cursor-pointer"
        {...register('status',{required:true})}
        />
        <label htmlFor="myCheck" className="noselect cursor-pointer text-gray-800 font-[600] ">make my course public</label>
        </div>
        {errors.status && <span className="text-red-500">make sure to mark the course as 'Public' to share it with others.</span> }
        
        <div className="my-4 flex gap-2 flex-row justify-end">
          <SecondaryButton text={'back'} className={'border-[1px] border-gray-400'} onClick={()=>dispatch(setStep(2))} />
          <BlueButton text={'publish'} type={'submit'} />
        </div>
      </form>
    </div>
  );
}

export default Publish;
