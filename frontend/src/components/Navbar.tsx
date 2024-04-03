import { NavbarLinks } from "../data/NavbarLinks";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import BlueButton from "./buttons/BlueButton";
import {  FaCaretDown } from "react-icons/fa";
import {  useSelector } from "react-redux";
import { RootState } from "../redux/store/Store";
import ProfileInfo from "./home/ProfileInfo";

const Navbar = () => {
  const {token} = useSelector((state:RootState)=> state.auth);
  const{Categorys} = useSelector((state:RootState)=> state.auth);
  
  return (
    <div className="border-b-[1.5px] border-gray-300 fixed top-0 w-[100%] bg-slate-100 backdrop-blur-xl bg-opacity-50 z-50 ">
      {/* <MaxWidthWrapper> */}
      <div className="flex sm:justify-around justify-between items-center ">
        {/* logo div */}
        <div className="w-[170px]">
          <Link to="/">
            <img src={logo} alt="logo" className="obj-fit" />
          </Link>
        </div>

        {/* navlink div */}
        <div>
          <ul className="lg:flex hidden gap-5">
            {NavbarLinks?.map((item,index) =>
              // Check if item.path is defined
              item.path !== undefined ? (
                <NavLink  to={item.path!} key={item.path}>
                  <li key={index} className="text-[16.8px] font-[500] hover:text-blue-600">
                    {item.title}
                  </li>
                </NavLink>
              ) : (
                <li
                  className=" text-[16.8px] font-[500] hover:text-blue-600 cursor-pointer flex flex-row items-center group gap-1 "
                  key={item.title}
                >
                  {item.title}
                  <FaCaretDown />

                  <div className="invisible absolute top-[70%] translate-x-[55px] h-[30px] w-[30px] rotate-45 bg-gray-800 group-hover:visible"></div>
                  <div className="invisible min-w-[250px] max-w-[260px] min-h-[60px] absolute bg-gray-800 top-[80%] -translate-x-[60px]  rounded-[10px] group-hover:visible  ">
                    {Categorys ? (
                      <div className="flex gap-1 flex-col p-3">
                         {
                          Categorys.map((item:any)=>(
                           <Link key={item._id} to={`/Catalog/${item._id}`}>
                            <li key={item._id} className="text-white text-[15px] p-2 rounded-md hover:bg-gray-700">{item.name}</li>
                           </Link>
                          ))
                         }
                      </div>
                    ) : (
                      <>
                        <div role="status" className="max-w-sm animate-pulse m-4 my-[30px]">
                          <div className="h-4.5 bg-gray-200 rounded-full dark:bg-gray-500 w-48 mb-4" />
                          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-500 max-w-[200px] mb-3.5" />
                          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-500 mb-3.5" />
                          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-500 max-w-[180px] mb-3.5" />
                          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-500 max-w-[200px] mb-3.5" />
                          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-500 max-w-[300px]" />
                          <span className="sr-only">Loading...</span>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              )
            )}
          </ul>
        </div>

        {/* login signup profile */}
        {token !== null && <ProfileInfo />}
        {token === null && (
          <div className="my-[10px] sm:flex hidden">
            <BlueButton
              text={"Sing up"}
              href={"/signup"}
              textColor={"text-blue-700"}
              className={
                "bg-opacity-0 border-2 border-blue-700 py-[8px] mr-[10px] hover:text-white"
              }
            />
            <BlueButton
              text={"Login"}
              href={"/login"}
              className={"border-2 border-blue-700 py-[8px]"}
            />
          </div>
        )}
      </div>
      {/* </MaxWidthWrapper> */}
    </div>
  );
};

export default Navbar;
