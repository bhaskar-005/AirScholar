import { sidebarLinks } from '../../data/Sidebar';
import SideLinks from './SideLinks';
import {  useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';
import Loading from '../Loading';
// import Modal from '../Modal';
// import toast from 'react-hot-toast';
// import { setUser } from '../../redux/slice/ProfileSlice';
// import { setToken } from '../../redux/slice/authSlice';


const Bottombar = () => {
  const { User } = useSelector((state:RootState)=>state.profile);
  // const [logoutModal , setLogoutModal] = useState<null|object>(null);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
 
  // const logoutFunction = ()=>{
  //   localStorage.removeItem('token');
  //   dispatch(setToken(null));
  //   dispatch(setUser(null));
  //   toast.success('logout successful');
  //   navigate('/');
  // }
  if(!User){
    return <Loading/>
  }
  return (
  
    <div className='lg:hidden flex h-[20%]'>
     <div className='fixed bottom-0 bg-blue-100 bg-opacity-70 flex flex-row justify-between backdrop-blur-sm sm:h-[70px] h-[50px] w-full z-10 border-t-[1px] border-t-gray-400'> 
         {
         sidebarLinks?.map((link)=>{
          if (link.type && User.accountType != link?.type) {
            return ;
          }
          return (
            <SideLinks key={link.id} text={link.name} icon={link.icon} path={link.path}/>
           )
         })}
         
         <SideLinks text={'Settings'} path={'/dashboard/settings'} icon={'VscSettingsGear'} />

      {/* logout button */}
         {/* <button
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
         </button>*/}
        </div> 
       {
        // logoutModal && <Modal modalData={logoutModal}/>
       }
    </div>
  );
}

export default Bottombar;
