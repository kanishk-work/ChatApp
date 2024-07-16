import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";

// Pages
import {
    Landing,
    Error,
    Chat,
} from "../Pages";


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
                path:"chat/:id",
                element: <Chat/>
            }
        ],
    },
]);

export default router;