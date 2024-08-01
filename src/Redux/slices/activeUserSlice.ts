import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  profilePic: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  bio: 'available',
  name: 'kanishk',
};

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    setActiveUser: (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.profilePic = payload.profilePic;
      state.bio = payload.bio;
      state.name = payload.name;
    },
    setUserNameAndBio: (state, { payload }) => {
      state.name = payload.name;
      state.bio = payload.bio;
    },
  },
});
export const { setActiveUser, setUserNameAndBio } = activeUserSlice.actions;
export default activeUserSlice.reducer;
