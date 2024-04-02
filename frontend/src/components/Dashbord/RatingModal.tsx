import { RootState } from '../../redux/store/Store';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ReactStars from 'react-stars';
import { useState } from 'react';
import { createRatingReview } from '../../api/api-function/auth-api';

const RatingModal = ({setRatingModal ,course}:any) => {
  const userinfo = useSelector((state:RootState)=>state.profile);
  const {token} = useSelector((state:RootState)=>state.auth);
  const [starCount , setStarcournt] = useState<number>(0);
  const [review , setreview] = useState<string|null>(null);
 
  const CreateRating = async()=>{
    if (!review) {
        toast.error('add review text.');
        return;
    }
    if (starCount == 0) {
        toast.error('at least add one star.')
        return ;
    }
    const data = {
      rating: starCount,
      review:review,
      courseId: course?._id
    }
    console.log(data);
    
    await createRatingReview(data , token)
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
          <h3 className="text-xl font-semibold text-gray-900">{'Rating and Review'}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
            onClick={()=> setRatingModal(false)}
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
        <form  className="p-4 md:p-5 space-y-4">
        <div className='flex items-center gap-2'>
         <div className='h-10 w-10 rounded-full overflow-hidden'><img className='h-full w-full' src={userinfo?.User.profilePhoto} alt="" /></div>
          <p className='text-lg font-medium '>{userinfo?.User.firstName} {userinfo?.User.lastName}</p>
        </div>  
        <ReactStars
                  count={5}
                  edit={true}
                  half={false}
                  size={24}
                  onChange={(stars)=>setStarcournt(stars)}
                />
          <textarea
            id="message"
            name="message"
            rows={4}
            onChange={(e)=>setreview(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-500 text-[16px] font-[500] rounded-md shadow-sm focus:outline-none focus:border-blue-300 focus:border-2"
            placeholder='How would you rate this course?'
         ></textarea>  
        </form>

        {/* Modal footer */}
        <div className={"flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b"}>
        <button
          data-modal-hide="default-modal"
          type="button"
          className="text-gray-900 bg-gray-50 hover:bg-gray-100 f rounded-lg border border-gray-600 text-sm font-medium px-5 py-2.5 mr-4"
          onClick={()=> setRatingModal(false)}
        >
          Close
        </button>
        <button
          data-modal-hide="default-modal"
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={()=>CreateRating()}
        >
          Submit
        </button>
      </div>
      </div>
    </div>
  </div>
  
  
  );
}

export default RatingModal;
