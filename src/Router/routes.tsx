import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";

// Pages
import {
    Landing,
    Error,
    Chat,
} from "../Pages";
import ChatListComp from "../Components/ChatListComp/ChatListComp";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path:"chatList",
                element: <ChatListComp/>
            },
            {
                path:"chat/:id",
                element: <Chat/>
            }
        ],
    },
]);

export default router;