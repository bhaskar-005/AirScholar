import { createSlice } from "@reduxjs/toolkit";

  interface authState {
   course: any,
   courseContent :any,  
  }
  const initialState: authState = {
    course : null,
    courseContent : null,
  };
  
export const viewCourse = createSlice(
   {
    name: 'viewCourse',
   initialState,
   reducers:{
    setViewCourse (state, value){
        state.course = value.payload;
    },
    setCourseContent(state,value){
        state.courseContent = value.payload;
    }
   }
})

export const {setViewCourse,setCourseContent} = viewCourse.actions;
export default viewCourse.reducer;