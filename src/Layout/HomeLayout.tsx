
import { Outlet } from "react-router-dom";
//import Footer from "../Components/Shared/Footer";
import Chats from "../Components/ChatListComp/Chats";
import ChatListComp from "../Components/ChatListComp/ChatListComp";

const HomeLayout = () => {
    return (
        <div className="h-[100vh] flex">
            <div className="w-[20vw] h-full">
                <ChatListComp />
            </div>
            <div className="w-[80vw]">
                <Outlet />
            </div>
            
            {/* <Footer/> */}
        </div>
    );
};

export default HomeLayout;
