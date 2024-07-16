import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";

// Pages
import {
    Landing,
    Error,
} from "../Pages";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
        ],
    },
]);

export default router;