import { RootState } from '../../../redux/store/Store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSubsection } from '../../../api/api-function/coures-api';
import toast from 'react-hot-toast';

const SubSectionModal = ({data ,setSubSectionModal , view=false}:{data:any;setSubSectionModal:any ;view?:any}) => {
    
    const [videoPreview, setVideoPreview] = useState('');
    const[title,setTitle] = useState('');
    const[description,setDescription] = useState('');
    const [file ,setFile] = useState<File|null>(null);
    const{token} = useSelector((state:RootState)=>state.auth);
    const{course} = useSelector((state:RootState)=>state.course);
    const dispatch = useDispatch();
  
    
    useEffect(() => {
        if (view) {
          
          setTitle(data.title);
          setDescription(data.description);
          setVideoPreview(data.videoUrl);
        }
      }, [data , data.title, data.description]);
    
    const  handleVideoChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e?.target.files?.[0];
        if(file){
            setFile(file);
            const videoURL = URL.createObjectURL(file);
            setVideoPreview(videoURL);
        }
        else{
            setFile(null);
            setVideoPreview('');
        }
    }

    //create subsection
    const CreateSubsection = async()=>{
        if (!title||!description||!file){
          toast.error('All fields are required');
          return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video',file);
        formData.append('sectionId',data._id);
        formData.append('courseId',course._id)

      await createSubsection(
        formData,
        dispatch,
        token
      )
      setSubSectionModal(null);
    }

  return (
    <div
    id="default-modal"
    tabIndex={-1}
    aria-hidden="true"
    className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex items-center bg-slate-700 bg-opacity-25 justify-center backdrop-blur-sm"
  >
    <div className="relative p-4 w-full max-w-2xl max-h-full">
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">{view ? 'View Subsection':'Create Subsection'}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
            onClick={()=> setSubSectionModal(null)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        
        {/* Modal body */}
        <form className="p-4 md:p-5 space-y-4">
        
        <div className="">
          <label htmlFor="video" className="block mb-1 text-sm font-medium text-gray-600">
            Video Input *
          </label>
          <div className='border-[1px] border-dashed border-gray-500 rounded-md'>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleVideoChange}
            className={view ? "hidden " : "absolute opacity-0"}
          />
          <div className= {view ? "hidden":'text-[15px] font-[600] p-2 hover:to-blue-500 hover:cursor-pointer'}>choose a video</div>
          {videoPreview && (
            <div >
              <video className="w-full" controls>
                <source src={ videoPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Title *
          </label>
          <input
            type="text"
            id="name"
            readOnly = {view}
            defaultValue={view ? data.title:''}
            className="mt-1 p-2 w-full border border-gray-500 rounded-md text-[16px] font-[500] shadow-sm focus:outline-none focus:border-blue-300 focus:border-2"
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='Enter title'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-600 ">
            Description *
          </label>
          <textarea
            id="message"
            name="message"
            readOnly={view}
            defaultValue={view ? data.description:''}
            rows={4}
            onChange={(e)=>setDescription(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-500 text-[16px] font-[500] rounded-md shadow-sm focus:outline-none focus:border-blue-300 focus:border-2"
            placeholder='Enter description'
         ></textarea>
        </div>
      </form>
        {/* Modal footer */}
        <div className={view ? "hidden":"flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b"}>
        <button
          data-modal-hide="default-modal"
          type="button"
          className="text-gray-900 bg-gray-50 hover:bg-gray-100 f rounded-lg border border-gray-600 text-sm font-medium px-5 py-2.5 mr-4"
          onClick={()=> setSubSectionModal(null)}
        >
          Close
        </button>
        <button
          data-modal-hide="default-modal"
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={()=>CreateSubsection()}
        >
          Create
        </button>
      </div>
      </div>
    </div>
  </div>
  
  
  );
}

export default SubSectionModal;
