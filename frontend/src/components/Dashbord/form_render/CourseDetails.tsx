import React, { useState } from "react";
import Input from "../../input/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { LuUploadCloud } from "react-icons/lu";
import { CreateCourseFunction } from "../../../api/api-function/auth-api";
import BlueButton from "../../buttons/BlueButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/Store";


type Inputs = {
  couresName: string;
  courseDescription: string;
  whatYouWillLearn: string;
  price: number;
  categoryId: any;
  status: string;
};

const CourseDetails = () => {
  const{Categorys} = useSelector((state:RootState)=>state.auth);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState<File | null>(null);
  const {token} = useSelector((state:RootState)=>state.auth);
  const dispatch = useDispatch();

 //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
 
  //submit function
  const onSubmit: SubmitHandler<Inputs> = (data) =>{ 
     console.log(data);
    const courseData = new FormData();
    courseData.append("couresName", data.couresName);
    courseData.append("courseDescription", data.courseDescription);
    courseData.append("whatYouWillLearn", data.whatYouWillLearn);
    courseData.append("price", String(data.price));
    courseData.append("categoryId", data.categoryId);
    if (file) {
      courseData.append("thumbnail", file);
    }
  
    //creating the course
    const createCourse = async()=>{
     const res = await CreateCourseFunction(courseData , token,dispatch);
    }
    createCourse();
  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFile(null);
      setImagePreview(null);
    }
  };
 


  return (
    <div className="border shadow-md sm:p-6 p-2 rounded-md bg-[#F4F9FF] bg-opacity-50">
      <form
       onSubmit={handleSubmit(onSubmit)}
       className="flex flex-col gap-6 "
       >
        {/* title */}
        <Input
          InputType={"text"}
          placeholder={"Your Course title"}
          label={"Course title *"}
          {...register("couresName", { required: true })}
        />
        {errors.couresName && (
          <span className="text-red-500">Title is required</span>
        )}

        {/* description */}
        <label htmlFor="Description">
          <p className="mb-2 text-[14px] font-medium text-gray-700">Course Description *</p>
          <textarea
           className={`py-3 px-4 w-full border-[1px] border-gray-400 text-[17px] font-[500] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none`}
            id="Description"
            cols={30}
            rows={6}
            placeholder="Short description "
            {...register("courseDescription", { required: true })}
          ></textarea>
        </label>
        {errors.courseDescription && (
          <span className="text-red-500">Course description is required</span>
        )}

        {/* price */}
        <Input
          InputType={"text"}
          label={"Course price *"}
          placeholder={"₹"}
          {...register("price", {
            required: true,
            max: 40000,
            valueAsNumber: true,
          })}
        />
        {errors.price && (
          <span className="text-red-500">
            Enter a valid price (between ₹0 and ₹39,999)
          </span>
        )}

        {/* category */}
        <label htmlFor="select">
         <p className="mb-2 text-[14px] font-medium text-gray-700">Category *</p>
        <select 
         className={`py-3 px-2 w-full border-[1px] border-gray-400 text-[17px] font-[500] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none`}
         id="select"
         {...register('categoryId',{required:true})}
         >
            <option value="" defaultChecked >
                Select a category
            </option>
            {
               Array.isArray(Categorys) && Categorys?.map((item:any)=>(
                    <option key={item?._id} value={item?._id}>{item?.name}</option>
                ))
            }
         </select>
         </label>
         {errors.categoryId && <span className="text-red-500">Select a category</span>}
       
       
        {/* whatYouWillLearn */}
        <label htmlFor="whatYouWillLearn">
          <p className="mb-2 text-[14px] font-medium text-gray-700">What you will learn *</p>
          <textarea
            className={`py-3 px-4 w-full border-[1px] border-gray-400 text-[17px] font-[500] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none `}
            id="whatYouWillLearn"
            placeholder="Curriculum Highlights"
            cols={30}
            rows={6}
            {...register("whatYouWillLearn", { required: true })}
          ></textarea>
        </label>
        {errors.whatYouWillLearn && (
          <span className="text-red-500">This field is required</span>
        )}

        {/* image file */}
        <label htmlFor="file">
            <p className="mb-2 text-[14px] font-medium text-gray-700">Select thumbnail *</p>
        <div
          className=" relative cursor-pointer bg-blue-50 w-full h-auto border-gray-900 border-[1.5px] border-dashed flex flex-col items-center justify-center rounded-md text-white">
          <input
            className="absolute w-full h-full opacity-0"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            id="file"
            onChange={handleFileChange}
          />
          {
            imagePreview ? (
                <>
                <img src={imagePreview} alt="Preview" className="w-full h-full object-fit rounded-md" />
                </>
                ):(
               <div className="my-[40px] flex flex-col items-center justify-center">
                <button className="flex justify-center items-center bg-blue-200 text-blue-700 h-[70px] w-[70px] rounded-full hover:bg-blue-300 transition duration-300">
                <LuUploadCloud className="text-[24px]" />
              </button>
              <span className="mt-4 text-sm text-gray-900 font-semibold mb-2">
              Drag and drop an image, or click to <span className="cursor-pointer font-bold text-blue-600">Browse</span> a file
              </span>
              </div>
            )
            
          }
         
        </div>
        </label>
       
        <BlueButton text={'create'} type={'submit'} className={'justify-end '}/>
        
      </form>
    </div>
  );
};

export default CourseDetails;
