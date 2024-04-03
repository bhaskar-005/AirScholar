import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';


const ProfileInfo = () => {
   const {User} = useSelector((state:RootState)=>state.profile)
   const{totalItems} = useSelector((state:RootState)=>state.cart);
   if (!User) {
     return (
      <div className='h-10 w-10 rounded-full bg-gray-300 animate-pulse m-4 '></div>
     )
   }

   return (
    <div className='flex flex-row items-center gap-3'>
       
       {
        User.accountType  != 'instructor' ? (
            <Link to={'/dashboard/cart'}>
               <div className=' relative '>
                <FiShoppingCart className='text-[20px] hover:text-blue-600' />
                <div className='flex justify-center items-center bg-blue-600 border-white border-[1px] absolute top-0 translate-y-[9px] translate-x-[14px] text-[8px] text-white w-5 h-5 text-center rounded-full'>
                  {+totalItems > 9 ?('9+'):(totalItems) }
                </div>
            </div>
            </Link>
        ):(
            <Link to={'/dashboard/instructor'}>
              <TbDeviceDesktopAnalytics className='text-[23px] text-gray-700 hover:text-blue-600' />
            </Link>
        )
       }
       <Link to={'/dashboard/profile'}>
       <div className='w-[36px] my-4 h-[36px] rounded-full justify-center items-center overflow-hidden mx-3 border-2 border-blue-600 shadow-sm'>
        <img src={User.profilePhoto} alt="profile" className='object-cover h-full w-full '/>
       </div>
       </Link>
    </div>
  );
}

export default ProfileInfo;
