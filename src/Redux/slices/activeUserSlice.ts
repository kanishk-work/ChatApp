import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveUser } from "../../Types/login";

const initialState: ActiveUser = {
  id: 0,
  updatedAt: "",
  createdAt: "",
  deletedAt: null,
  client_id: 0,
  client: {
    id: 0,
    updatedAt: "",
    createdAt: "",
    deletedAt: null,
    name: "",
    email: "",
    status: "",
  },
  full_name: "",
  short_name: null,
  client_user_id: "",
  role: "",
  email: "",
  mobile_no: null,
  profile_pic: null,
  status: "",
};

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<ActiveUser>) => {
      const {
        id,
        updatedAt,
        createdAt,
        deletedAt,
        client_id,
        client,
        full_name,
        short_name,
        client_user_id,
        role,
        email,
        mobile_no,
        profile_pic,
        status,
      } = action.payload;
      state.id = id;
      state.updatedAt = updatedAt;
      state.createdAt = createdAt;
      state.deletedAt = deletedAt;
      state.client_id = client_id;
      state.client = client;
      state.full_name = full_name;
      state.short_name = short_name;
      state.client_user_id = client_user_id;
      state.role = role;
      state.email = email;
      state.mobile_no = mobile_no;
      state.profile_pic = profile_pic;
      state.status = status;
    },
    setUserNameAndBio: (state, action: PayloadAction<{ name: string }>) => {
      state.full_name = action.payload.name;
    },
  },
});

export const { setActiveUser, setUserNameAndBio } = activeUserSlice.actions;
export default activeUserSlice.reducer;
