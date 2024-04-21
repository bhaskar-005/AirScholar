import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { averageRatingOnlyId } from '../../util/averageRating';

const CourseCard = ({id, image ,title  , instructor ,price , enrolled,className,actualPrice ,ratingAndReviews}:{id:string; image:string;title: string ; instructor:string; price:number|string ; enrolled:any; className?:string ,actualPrice?:number , ratingAndReviews:any}) => {

  return (
    <Link key={id} to={`/courses/${id}`}>
    <div key={id} className={`hover:scale-105 duration-100 ${className}`}>
         <div className='bg-slate-50 border border-gray-300 sm:h-[300px] h-auto rounded-md shadow-md sm:w-[270px] w-[145px]  sm:p-2 p-1 sm:pb-auto pb-3 '>
        <div className='w-full sm:h-[160px] h-[100px]'>
            <img className='w-full h-full object-cover' src={image} alt="thumbnail" />
        </div>
        <div className='flex flex-col sm:gap-[3px] gap-1 mt-2'>
        <h2 className='sm:text-[17px] text-[13px] font-[600] text-slate-700 sm:leading-6 leading-0'>{title.slice(0,40)} ...</h2>
            <p className='sm:text-[12px] text-[10px] mt-1 text-slate-500 font[600]'>{instructor}</p>
             <div className='flex flex-row justify-between items-center gap-2'>
                <div className='flex flex-row items-center gap-2'>
                 <ReactStars
                      count={5}
                      value={averageRatingOnlyId(ratingAndReviews,enrolled)}
                      edit={false}
                      className='h-full w-full'
                      color2={'#ffd700'}
                     />
                 <div className='font-[600] sm:block hidden text-slate-600'>({enrolled})</div>
                </div>
                 <div className='flex sm:flex-row flex-col items-center'>
                 <p className='sm:text-[19px] text-[15px] mr-2 text-slate-600 font-[700]'>₹ {price}</p>
                 <p className='sm:text-[16px] text-[12px] mr-3 text-slate-400 font-[400] line-through'> {actualPrice ? '₹' + actualPrice : null} </p>  
                 </div>
            </div>
        </div>
     </div>
    </div>
    </Link>
  );
}

export default CourseCard;
