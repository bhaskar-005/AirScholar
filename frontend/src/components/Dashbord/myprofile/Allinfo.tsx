import React from 'react';
import IconButton from '../../buttons/IconButton';
import { TbEdit } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/Store';

const Allinfo = () => {
    const {User} = useSelector((state:RootState)=>state.profile)
  return (
    <div className='bg-blue-100 bg-opacity-30 sm:px-[50px] px-[30px] sm:border-gray-300 border-gray-400 py-8 rounded-lg border-[1px]'>
    <div className=' flex items-center justify-between my-[20px]'>
    <div className='flex flex-row items-center gap-3'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-[20px] font-[500]'>Personal Details</h2>
       </div>
    </div>
    <div className='sm:flex hidden'>
      <IconButton 
      text={'Edit'} 
      path={'/dashboard/settings'}
      childern={<TbEdit />} 
      />
    </div>
  </div>
  {/* {information section} */}
  <div className='flex lg:flex-row flex-col sm:gap-16 gap-2'>
        <div className='flex flex-col justify-between  gap-3'>
            <div>
                <h2 className='text-[14.5px] '>First Name</h2>
                <p className='text-[15px] font-[500] text-gray-800 '>{User.firstName}</p>
            </div>
            <div>
                <h2 className='text-[14.5px] '>Last Name</h2>
                <p className='text-[15px] font-[500] text-gray-800'>{User.lastName}</p>
            </div>
            <div>
                <h2 className='text-[14.5px]'> Email</h2>
                <p className='text-[15px] font-[500] text-gray-800 '>{User.email}</p>
            </div>
        </div>
        <div className='flex flex-col gap-3'>
            <div>
                <h2 className='text-[14.5px]'>Phone</h2>
                <p className='text-[15px] font-[500] text-gray-800'>{
                    User.moreInfo.phonenumber != null ? User.moreInfo.phonenumber : 'add phone number'
                }</p>
            </div>
            <div>
                <h2 className='text-[14.5px]'>Gender</h2>
                <p className='text-[15px] font-[500] text-gray-800 '>{
                User.moreInfo.gender != null ? User.moreInfo.gender: 'add gender'
                }</p>
            </div>
            <div>
                <h2 className='text-[14.5px] '>date of birth</h2>
                <p className='text-[15px] font-[500] text-gray-800 '>{
                User.moreInfo.dob != null ? User.moreInfo.dob : 'add date of birth' }</p>
            </div>
        </div>
    </div>
</div>
  );
}

export default Allinfo;
