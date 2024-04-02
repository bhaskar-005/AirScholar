import  { useEffect, useState } from 'react';
import { getCourseBycategoryId } from '../api/api-function/coures-api';
import {  useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import CourseCard from '../components/home/CourseCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {  Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import IconButton from '../components/buttons/IconButton';
import { RiExternalLinkLine } from 'react-icons/ri';



const CategoryPage = () => {
  const location = useParams();
  const[noCourse , setNoCourse] = useState(false);
  const[categoryData , setCategoryData] = useState<any>([]);
  const[mostEnrolled , setMostEnrolled] = useState([]);
  const[loading , setloading] = useState(false);

  const fetchCourse = async()=>{
   setloading(true);
   setNoCourse(false);
   const res = await getCourseBycategoryId(location.id,setNoCourse );
   setloading(false);
   setCategoryData(res.category);
   setMostEnrolled(res.mostEnrolled);
}
  useEffect(()=>{
    fetchCourse();
  },[location])
  if (loading) {
    return <Loading/>
  }

  return (
    <>
      <section className="flex justify-center bg-blue-100 mt-[60px] mb-[20px]">
        <div className="w-[1150px] sm: ml-3 my-5">
          <h2 className="text-[20px] font-[700] my-2 text-gray-800">
            {categoryData.name}
          </h2>
          <p className="text-[14px] font-[500] mb-2 text-gray-600">
            {categoryData.description}
          </p>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-[1150px] flex flex-row sm:gap-6 gap-3 flex-wrap justify-center ">
        {
          noCourse &&(
            <div className='text-[20px] text-gray-800 font-[600]'>No course found For "{categoryData.name}" </div>
          )
        }
          {categoryData?.courses?.map((data: any) => (
            <CourseCard
            ratingAndReviews={data?.ratingAndReviews}
              key={data._id}
              actualPrice={data?.actualPrice ? data.actualPrice : null}
              id={data._id}
              image={data.thumbnail}
              title={data.couresName}
              instructor={`${data.instructor.firstName} ${data.instructor.lastName}`}
              price={data.price}
              enrolled={`${data.ratingAndReviews.length}`}
            />
          ))}
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-[1150px] flex flex-row gap-6 flex-wrap overflow-hidden mt-20">
         <p className='text-[20px] font-[700] text-gray-700'>Top Courses</p>
         <Swiper
          
           slidesPerView={2}
           spaceBetween={22}
           autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
           loop={true}
           modules={[FreeMode, Pagination,Autoplay]}
           breakpoints={{
            500:{
              slidesPerView:2
            },
            768:{
              slidesPerView:3
            },
             1100: {
               slidesPerView: 4,
             },
           }}
           className="mySwiper"
          >
            {mostEnrolled.map((data: any , index) => (
              <SwiperSlide  key={index}>
                <CourseCard
                  ratingAndReviews={data.ratingAndReviews}
                  id={data._id}
                  image={data.thumbnail}
                  title={data.couresName}
                  instructor={`${data.instructor.firstName} ${data.instructor.lastName}`}
                  price={data.price}
                  enrolled={`${data.ratingAndReviews.length}`}
                  className={'hover:scale-100 '}
               />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <div className='flex justify-center mb-20 mt-5'>
        <IconButton text={'All course'} path={'/Courses'} childern={<RiExternalLinkLine />}/>
      </div>
     
    </>
  );
}

export default CategoryPage;
