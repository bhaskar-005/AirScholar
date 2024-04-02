import { createSlice } from "@reduxjs/toolkit";

export interface authState {
  token: string | null;
  signUpdata : any;
  loading : boolean;
  Categorys : any;
}
const storedToken = localStorage.getItem("token");
const initialState: authState = {
  token: storedToken ? storedToken : null,
  signUpdata: null,
  loading: false,
  Categorys:null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setSignUpData(state, value) {
      state.signUpdata = value.payload;
    },
    loading(state, value) {
      state.loading = value.payload;
    },
    SetCategory(state, value) {
      state.Categorys = value.payload;
    },
  },
});
export const {SetCategory, setToken,setSignUpData,loading } = authSlice.actions;
export default authSlice.reducer;
