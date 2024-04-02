import { createSlice } from "@reduxjs/toolkit";

export interface profile {
   User:any;
}
const initialState: profile = {
     User: null,
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, value) {
      state.User = value.payload;
    },
  },
});
export const { setUser } = ProfileSlice.actions;
export default ProfileSlice.reducer;
