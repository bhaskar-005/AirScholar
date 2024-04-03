import  { useEffect, useState } from 'react';
import { getFullAccessCourse } from '../api/api-function/coures-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/Store';
import {  useParams } from 'react-router-dom';
import { Player} from "video-react";
import 'video-react/dist/video-react.css';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import IconButton from '../components/buttons/IconButton';
import { VscFeedback } from 'react-icons/vsc';
import RatingModal from '../components/Dashbord/RatingModal';

const ViewCourse = () => {
  const {token} = useSelector((state:RootState) => state.auth );
  const {course} = useSelector((state:RootState) => state.viewCourse );
  const {User} = useSelector((state:RootState)=>state.profile)
  const dispatch = useDispatch();
  const location = useParams();
  const {courseContent} = useSelector((state:RootState) => state.viewCourse);
  const [videoUrl , setVideoUrl] = useState('');
  const [activVideo , setactivVideo] = useState('');
  const [ratingModal , setRatingModal] = useState(false);
  
  async function getCoursefunciton(){
    await getFullAccessCourse(location.id , token , dispatch);
  }
  useEffect(()=>{
     getCoursefunciton();
  },[])
  
  useEffect(()=>{
    if (courseContent) {
     const url = courseContent[0].subSection[0]
      setVideoUrl(url.videoUrl);
      setactivVideo(url._id)
     }
  },[courseContent])

  const handleVideoClick = (id:string,videoUrl:string)=>{
    setactivVideo(id) 
    setVideoUrl(videoUrl)
  }

  
  return (
    <div className="mt-[80px] mx-auto max-w-[1300px]  px-4">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-2/3 mx-auto md:ml-4 ">
        <Player aspectRatio="16:9" playsInline src={videoUrl} />
         <div className='mt-[20px]'>
        {
           User?.accountType == "instructor" ? (
            null
           ):(
            <IconButton 
            childern={<VscFeedback />}
            text={'Add Review'}
            className='mt-6 mb-4'
            onClick={()=>setRatingModal(true)}
            />
           )
        }
         <h2 className='text-[19px] font-[600] text-gray-900'>{course?.couresName}</h2>
         <p className='text-[16px] font-[500] text-gray-600'>{course?.courseDescription}</p>
         </div>
      </div>
      <div className="max-w-md border-[0.7px] border-gray-300 w-full mx-auto mt-4 md:mt-0">
        {courseContent?.map((section: any, index: any) => (
          <details key={index} className=" p-2 mb-4 md:mb-2">
            <summary className="bg-blue-50 p-2 cursor-pointer text-lg font-bold text-gray-700">
              {section.sectionName}
            </summary>
            <div className="p-2">
              {section.subSection.map((subSection: any, subIndex: any) => (
                <div
                  onClick={() => handleVideoClick(subSection._id , subSection.videoUrl)}
                  key={subIndex}
                  className="mb-2"
                >
                  <p className={`flex flex-row items-center gap-3 text-[16px] ${activVideo == subSection._id ? 'text-blue-800 underline':'text-gray-700'} font-[500] cursor-pointer hover:text-gray-900 duration-300 hover:underline`}>
                  <MdOutlineOndemandVideo className='mt-1'/> {subSection.title}
                  </p>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
    {
      ratingModal && <RatingModal setRatingModal={setRatingModal} course={course} />
    }
  </div>
  );
}

export default ViewCourse;
