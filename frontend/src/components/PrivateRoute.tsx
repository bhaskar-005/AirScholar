import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/Store';
import { Outlet, useNavigate } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ( ) => { // Fix the spelling of 'children'
  const navigate = useNavigate();
  const { User } = useSelector((state: RootState) => state.profile);
  
  if (!User) {
    navigate('/login');
    return null; 
  } else {
    <Outlet/> 
}
}

export default PrivateRoute;
