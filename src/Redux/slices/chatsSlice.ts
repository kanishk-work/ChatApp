// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export interface UserInfo {
//   id: number;
//   name: string;
//   img: string;
//   status: "active" | "offline" | "away"; // Customize as needed
//   lastOnline?: string;
// }

// export interface ChatMessage {
//   id: number;
//   text: string | File;
//   senderId: number; // User ID of the sender
//   timestamp: string;
// }

// export interface ChatsState {
//   users: {
//     [userId: number]: UserInfo; // User information by ID
//   };
//   conversations: {
//     [userId: number]: ChatMessage[]; // Messages for each user
//   };
//   activeChat: number | null; // Currently active chat user ID
//   notifications: string[];
//   currentUserId: number;
// }

// const initialState: ChatsState = {
//   users: {
//     1: {
//       id: 1,
//       name: "John Doe",
//       img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       status: "active",
//       lastOnline: new Date().toString(),
//     },
//     2: {
//       id: 2,
//       name: "Jane Smith",
//       img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       status: "away",
//       lastOnline: new Date().toString(),
//     },
//   },
//   conversations: {
//     1: [
//       {
//         id: 1,
//         text: "Hello, how are you?",
//         senderId: 1,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 2,
//         text: "I'm good, thanks! How about you?",
//         senderId: 2,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 3,
//         text: "Hello, how are you?",
//         senderId: 1,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 4,
//         text: "I'm good, thanks! How about you?",
//         senderId: 2,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 5,
//         text: "Hello, how are you?",
//         senderId: 1,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 6,
//         text: "I'm good, thanks! How about you?",
//         senderId: 2,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 7,
//         text: "Hello, how are you?",
//         senderId: 1,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 8,
//         text: "I'm good, thanks! How about you?",
//         senderId: 2,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 9,
//         text: "Hello, how are you?",
//         senderId: 1,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 10,
//         text: "I'm good, thanks! How about you?",
//         senderId: 2,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 11,
//         text: "Hello, how are you?",
//         senderId: 1,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 12,
//         text: "I'm good, thanks! How about you?",
//         senderId: 2,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 13,
//         text: "Hello, how are you?",
//         senderId: 1,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 14,
//         text: "I'm good, thanks! How about you?",
//         senderId: 2,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 15,
//         text: "Hello, how are you?",
//         senderId: 1,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 16,
//         text: "I'm good, thanks! How about you?",
//         senderId: 2,
//         timestamp: new Date().toString(),
//       },
//     ],
//     2: [
//       {
//         id: 3,
//         text: "Hi there! Ready for the meeting?",
//         senderId: 2,
//         timestamp: new Date().toString(),
//       },
//       {
//         id: 4,
//         text: "Yes, I am. See you soon.",
//         senderId: 1,
//         timestamp: new Date().toString(),
//       },
//     ],
//   },
//   activeChat: null,
//   notifications: [],
//   currentUserId: 1,
// };
// const chatsSlice = createSlice({
//   name: "chats",
//   initialState,
//   reducers: {
//     setActiveChat: (state, action: PayloadAction<number | null>) => {
//       state.activeChat = action.payload;
//     },
//     addMessage: (
//       state,
//       action: PayloadAction<{
//         userId: number;
//         message: Omit<ChatMessage, "id">;
//       }>
//     ) => {
//       const { userId, message } = action.payload;
//       if (!state.conversations[userId]) {
//         state.conversations[userId] = [];
//       }
//       state.conversations[userId].push({
//         ...message,
//         id: Date.now(),
//         senderId: state.currentUserId,
//       });
//     },
//     setNotifications: (state, action: PayloadAction<string[]>) => {
//       state.notifications = action.payload;
//     },
//   },
// });

// export const { setActiveChat, addMessage, setNotifications } =
//   chatsSlice.actions;
// export default chatsSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  id: number;
  name: string;
  img: string;
  status: "active" | "offline" | "away"; // Customize as needed
  lastOnline?: string;
}

export interface ChatMessage {
  id: number;
  textMessage: string;
  file: string[] | null;
  senderId: number; // User ID of the sender
  timestamp: string;
}

export interface ChatsState {
  users: {
    [userId: number]: UserInfo; // User information by ID
  };
  conversations: {
    [userId: number]: ChatMessage[]; // Messages for each user
  };
  activeChat: number | null; // Currently active chat user ID
  notifications: string[];
  currentUserId: number;
}

const initialState: ChatsState = {
  users: {
    1: {
      id: 1,
      name: "John Doe",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "active",
      lastOnline: new Date().toString(),
    },
    2: {
      id: 2,
      name: "Jane Smith",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "away",
      lastOnline: new Date().toString(),
    },
  },
  conversations: {
    1: [], // Initialize with empty conversations
    2: [], // Initialize with empty conversations
  },
  activeChat: null,
  notifications: [],
  currentUserId: 1,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<number | null>) => {
      state.activeChat = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{
        userId: number;
        message: Omit<ChatMessage, "id">; // Note: `id` is generated in the reducer
      }>
    ) => {
      const { userId, message } = action.payload;
      if (!state.conversations[userId]) {
        state.conversations[userId] = [];
      }

      state.conversations[userId].push({
        ...message,
        id: Date.now(), // Generate a unique ID for the message
        senderId: state.currentUserId,
      });
    },
    setNotifications: (state, action: PayloadAction<string[]>) => {
      state.notifications = action.payload;
    },
  },
});

export const { setActiveChat, addMessage, setNotifications } =
  chatsSlice.actions;
export default chatsSlice.reducer;
