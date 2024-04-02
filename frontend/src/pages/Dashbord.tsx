import React from 'react';
import Sidebar from '../components/Dashbord/Sidebar';
import { Outlet } from 'react-router-dom';
import Bottombar from '../components/Dashbord/Bottombar';

const Dashbord = () => {
  return (
    <div className='flex flex-row'>
        <Sidebar />
        <Bottombar/>
          <div className='flex justify-center w-full'>
              <div className='max-w-[1000px] w-11/12 mt-[66px] '>
                 <Outlet/>
              </div>
         </div>
    </div>
  );
}

export default Dashbord;
