import  { useEffect, useState } from 'react';
import { MdDelete, MdOutlinePublishedWithChanges,MdUnpublished } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import IconButton from '../buttons/IconButton';
import { IoMdAdd } from 'react-icons/io';
import { getInstructorCourses } from '../../api/api-function/coures-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

const MyCourses = () => {
    const [course , setCourse] = useState<any>([]);
    const [isCourses , setIsCourses] = useState(false);

    const {token} = useSelector((state:RootState)=>state.auth);
    const{loading} = useSelector((state:RootState)=>state.auth);
    const dispatch = useDispatch();

    const getCourse = async()=>{
      const res = await getInstructorCourses(dispatch,token,setIsCourses);
      setCourse(res.data);
      
    }
    useEffect(()=>{
      getCourse()
    },[])
   
  
  return (
    <div>
         <div className='flex justify-between my-10'>
             <h1 className='text-[27px] font-[600] sm:flex hidden'>MY courses</h1>
             <h1 className='text-[27px] font-[600] sm:hidden flex'>courses</h1>
             <IconButton path={'/dashboard/add-course'} text={'Add course'} childern={<IoMdAdd />}/>
         </div>
         <div className='mb-[100px]'>
          {isCourses && <div className='text-[18px] font-[600]'> no course found</div>}
            {
              loading ? (<Loading/>):(
                
                <div className="flex flex-col sm:gap-7 gap-3">
                {/* course card */}
                   {
                    course.map((data:any)=>(
                     <Link key={data._id} to={'/viewCourse/'+data._id}>
                   <div key={data._id} className="rounded-lg flex flex-row border border-gray-300 items-center">
                  <div className="m-1 sm:h-[170px] h-[100px] sm:w-[430px] w-[200px]">
                    <img
                      src={data?.thumbnail}
                      alt="thumbnail"
                      className="object-cover  w-full h-full rounded-lg"
                    />
                  </div>
                <div className='flex sm:flex-row flex-col justify-between w-full items-center p-1'>
                <div className="flex flex-col gap-1 w-full mx-6 ">
                    <div className="flex flex-col ">
    
                      <div className="flex flex-col gap-2">
                        <div>
                          <h2 className="lg:text-[24px]  sm:text-[18px] text-[15px] font-[500]">
                            {data.couresName.slice(0,40)} ...
                          </h2>
                          <p className="sm:flex hidden font-[400] sm:text-[14px] text-[12px] text-gray-500">
                            {data.courseDescription.slice(0,100)} ...
                          </p>
                        </div>
                        <p className="text-gray-600 sm: text-[12px] font-[500]">
                          created at: <span className="text-black"> {new Date(data.updatedAt).toString().slice(3, 15)}</span>{" "}
                        </p>
        
                      </div>
                             <div className='py-[10px] flex justify-start'>
                                    <div className={`bg-gray-100 border ${data.status == 'Published' ?'border-green-500 text-green-700':'border-red-200 text-red-700'} flex flex-row items-center font-[500] gap-1 py-1 px-3 rounded-[20px]`}>
                                         <p className='sm: text-[10px]'>{data.status == 'Published' ?'Published':'draft'}</p>
                                         {data.status == 'Published' ?<MdOutlinePublishedWithChanges />:<MdUnpublished />}
                                     </div>
                              </div>
                    </div>
                  </div>
                  {/* button and price */}
                  <div className="flex gap-3 sm:flex-col flex-row sm:w-auto w-full sm:justify-end justify-between mx-5">
                    <div className="sm:text-[21px] text-[16px] text-center font-[600]  flex flex-row">
                      <span className="text-gray-800 ">Rs.</span> {data.price}
                    </div>
                     <div className='flex flex-row gap-3 justify-center'>
                     
                     <Link to={`/dashboard/edit/${data._id}`}> 
                     <button className='sm:text-[20px] text-[15px] text-gray-600 '><FaEdit /></button>
                    </Link>
                     <button className='sm:text-[22px] text-[15px] text-gray-600 '><MdDelete /></button>
                     </div>
                  </div>
                </div>
                </div>
                     </Link>
                    ))
                   }
              </div>
    
              )
            }
         </div>
    </div>
  );
}

export default MyCourses;
