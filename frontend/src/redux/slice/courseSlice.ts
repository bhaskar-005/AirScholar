import { createSlice } from "@reduxjs/toolkit";

interface courseState{
    steps:number;
    course : any;
}

const initialState:courseState = {
    steps : 1,
    course: null,
}

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers:{
       setStep(state,value){
           state.steps = value.payload;
       },
      setCourse(state,value){
        state.course = value.payload;
      }
    }
})

export const {setCourse,setStep} = courseSlice.actions;
export default courseSlice.reducer;