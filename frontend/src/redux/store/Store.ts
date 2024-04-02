import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slice/authSlice';
import ProfileSlice from '../slice/ProfileSlice';
import courseSlice from '../slice/courseSlice';
import cartSlice from '../slice/cartSlice';
import viewCourseSlice from '../slice/viewCourseSlice';

export const Store = configureStore({
    reducer:{
      auth:authSlice,
      profile : ProfileSlice,
      course : courseSlice,
      cart : cartSlice,
      viewCourse : viewCourseSlice,
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch