import { useDispatch, useSelector } from 'react-redux';
import about from '../../assets/about.png';
import ReactStars from 'react-stars';
import ProgressBar from "@ramonak/react-progress-bar";
import { RootState } from '../../redux/store/Store';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Link } from 'react-router-dom';


const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [noCourse, setNoCourse] = useState(false);
  const [loading, setloading] = useState(false);
  const { User } = useSelector((state: RootState) => state.profile);
  
  useEffect(() => {
    setNoCourse(false);
    setloading(true);
  
    if (User) {
      setCourses(User.course);
      if (User?.course.length === 0) {
        setNoCourse(true);
      }
    }
    setloading(false);
  }, [User]);
  
  if (loading) {
    return <Loading/>
  }

  const calculateTotalSectioin = (courseContent:any)=>{
       let total = 0;
       courseContent.forEach((subSection:any) => {
         total = subSection.subSection.length + total;
       });
       return total;
  }
  
  return (
    <div className='flex flex-col gap-5 my-[20px] mb-[100px]'>
        <h1 className='text-[25px] font-bold my-3'>Enrolled Courses</h1>
     {/* course cards */}
     <div className='flex  flex-col sm:gap-8 gap-3'>
        {/* course card */}
        {
          noCourse &&(
            <div className='text-black text-[17px] font-[600]'>You are not currently enrolled in any courses.</div>
          )
        }
             
             {
              courses?.map((item:any , index)=>(
               <Link key={index} to={`/viewCourse/${item._id}`}>
                   <div key={index}  className='flex flex-row border items-center rounded-[3px]'>
                <div className='sm:h-[200px] h-[100px] sm:w-[500px] w-[250px] rounded-md overflow-hidden bg-black'>
                   <img src={item?.thumbnail} alt="thumbnail" className='object-cover  w-full h-full' />
                </div>
                <div className='flex flex-col gap-0 w-full sm:mx-10 mx-2 '>
                      <div className='flex flex-col '>
                        <ReactStars
                         count={5}
                         value={3}
                         edit={false}
                         size={22}
                         color2={'#ffd700'}
                        />
                      
                      <div className='flex flex-col sm:gap-2 gap-1'>
                          <div>
                          <h2 className='lg:text-[24px] sm:text-[18px] text-[12px] font-[500]'>{item.couresName.slice(0,40)}..</h2>
                           <p className='sm:block hidden font-[400] lg:text-[14px] text-[13px] text-gray-500'>{item.courseDescription.slice(0,90)}..</p>
                          </div>
                       <p className='text-gray-600 lg:text-[13px] sm:text-[15px] text-[10px] font-[500]'>Completed Lessons: <span className='text-black'>0 of {`${calculateTotalSectioin(item.courseContent)}`}</span> </p>
                      </div>
                      </div>
                      <div className='sm:mt-[10px] mt-[2px] flex justify-between'>
                        <div className='w-full sm:block hidden'>
                            <ProgressBar completed={60} bgColor='#2563EB'  />
                        </div>
                      </div>
                </div>
           </div>
               </Link>
              ))
             }

         </div>
    </div>
  );
}

export default EnrolledCourses;
