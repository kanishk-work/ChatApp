
import { Outlet } from "react-router-dom";
//import Footer from "../Components/Shared/Footer";
import ChatListComp from "../Components/ChatListComp/ChatListComp";

const HomeLayout = () => {
    return (
        <div className="h-[100vh] flex bg-[var(--bg-color)]">
            <div className="hidden sm:block w-[25vw] min-w-[320px] h-full">
                <ChatListComp />
            </div>
            <div className="">
                <Outlet />
            </div>
            
            {/* <Footer/> */}
        </div>
    );
};

export default HomeLayout;
