
import { Outlet } from "react-router-dom";
//import Footer from "../Components/Shared/Footer";
import Chats from "../Components/ChatListComp/Chats";
import ChatListComp from "../Components/ChatListComp/ChatListComp";

const HomeLayout = () => {
    return (
        <div className="h-[100vh] grid grid-cols-12 grid-rows-1">
            <ChatListComp />
            <Outlet />
            {/* <Footer/> */}
        </div>
    );
};

export default HomeLayout;
