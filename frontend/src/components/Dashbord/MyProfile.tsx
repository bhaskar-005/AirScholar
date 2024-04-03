import IconButton from '../buttons/IconButton';
import { TbEdit } from "react-icons/tb";
import About from './myprofile/About';
import Allinfo from './myprofile/Allinfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';
import Loading from '../Loading';

const MyProfile = () => {
  const {User} = useSelector((state:RootState)=>state.profile);
  if (!User) {
   return <Loading/>
  }
  return (
    <div className="flex flex-col sm:gap-8 gap-4 my-[20px] mb-16">
      <div className='flex justify-between items-center'>
        <div className="text-[25px] font-bold my-3">Profile</div>
        <div className='sm:hidden flex'>
          <IconButton
            text={"Edit"}
            path={"/dashboard/settings"}
            childern={<TbEdit />}
          />
        </div>
      </div>
      {/* div 1 */}
      <div className="bg-blue-100 bg-opacity-30 sm:px-[50px] px-[20px] py-8 rounded-lg border-[0.2px] sm:border-gray-300 border-gray-400 flex items-center justify-between sm:min-h-[160px] min-h-[140px]">
        <div className="flex flex-row items-center sm:gap-8 gap-3">
          <div className="sm:w-[100px] w-[70px] sm:h-[100px] h-[70px] rounded-full overflow-hidden bg-black flex items-center justify-center">
            <img
              src={User.profilePhoto}
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="sm:text-[20px] text-[18px] font-[500]">
              {User.firstName} {User.lastName}
            </h2>
            <h4 className="sm:text-[14px] text-[13px] text-gray-700 font-[400]">
              {User.email}
            </h4>
          </div>
        </div>
        <div className="sm:flex hidden">
          <IconButton
            text={"Edit"}
            path={"/dashboard/settings"}
            childern={<TbEdit />}
          />
        </div>
      </div>

      {/* about components */}
      <About about={User.moreInfo.about} />
      <Allinfo />
    </div>
  );
}

export default MyProfile;
