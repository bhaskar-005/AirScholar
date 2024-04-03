import  { useState } from 'react';
import { sidebarLinks } from '../../data/Sidebar';
import { useNavigate } from 'react-router-dom';
import SideLinks from './SideLinks';
import { VscSignOut } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';
import Modal from '../Modal';
import toast from 'react-hot-toast';
import { setUser } from '../../redux/slice/ProfileSlice';
import { setToken } from '../../redux/slice/authSlice';


const Sidebar = () => {
  const { User } = useSelector((state:RootState)=>state.profile);
  const [logoutModal , setLogoutModal] = useState<null|object>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!User) { 
    return (
      <div className=' mt-[62px] w-[300px]  '>
      <div className='fixed laft-0 bg-blue-200 bg-opacity-30 w-[300px] h-[100vh] border'> 
      <div role="status" className="max-w-sm animate-pulse m-4 my-[30px]">
      <div className="h-5 bg-slate-300 rounded-full max-w-[270px] mb-6" />
      <div className="h-5 bg-slate-300 rounded-full max-w-[280px] mb-6" />
      <div className="h-5 bg-slate-300 rounded-full max-w-[300px] mb-6" />
      <div className="h-5 bg-slate-300 rounded-full max-w-[300px] mb-6" />
        <div className='w-full h-[0.5px] my-4 bg-gray-300'></div>
      <div className="h-5 bg-slate-300 rounded-full max-w-[300px] mb-6" />
      <div className="h-5 bg-slate-300 rounded-full max-w-[300px] mb-6" />
      <span className="sr-only">Loading...</span>
    </div>
     </div>
     </div> 
    )
  }
  const logoutFunction = ()=>{
    localStorage.removeItem('token');
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.success('logout successful');
    navigate('/');
  }
  return (
    <div className=' mt-[62px] w-[300px] lg:flex hidden'>
     <div className='fixed laft-0 bg-blue-200 bg-opacity-30 xl:w-[300px] w-[230px] h-[100vh] border'> 
         
         {
         sidebarLinks?.map((link,index)=>{
          if (link.type && User.accountType != link?.type) {
            return null;
          }
          return (
            <SideLinks key={index} text={link.name} path={link.path} icon={link.icon} />
           )
         })}
         {/* line break */}
         <div className=' bg-gray-400 h-[0.5px] my-3 mx-3 '></div>
         <SideLinks text={'Settings'} path={'/dashboard/settings'} icon={'VscSettingsGear'} />

      {/* logout button */}
         <button
         onClick={()=>setLogoutModal({
           title:"Are you sure you want to log out? Click 'Logout' to confirm.",
           btn1Text: 'Logout',
           btn2Text: 'cancel',
           btn1Handler: ()=>logoutFunction(),
           btn2Handler: ()=>setLogoutModal(null)
         })}
         >
         <div className="flex flex-row gap-3 items-center p-[10px] text-[16px] font-[400] w-full">
         <div><VscSignOut /></div> 
         <div>Log out</div>
         </div>
         </button>
        </div>
       {
        logoutModal && <Modal modalData={logoutModal}/>
       }
    </div>
  );
}

export default Sidebar;
