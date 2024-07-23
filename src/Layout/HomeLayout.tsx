
import { Outlet } from "react-router-dom";
//import Footer from "../Components/Shared/Footer";
import ChatListComp from "../Components/ChatListComp/ChatListComp";
import { useAppSelector } from "../redux/hooks";
import { Chat } from "../Pages";

const HomeLayout = () => {
    const { showProfile, showNotifications } = useAppSelector((state) => state.profile)
    return (
        <div className="h-[100vh] flex bg-[var(--bg-color)]">
            <div className="hidden sm:block w-[25vw] min-w-[320px] h-full">
                {
                    !showProfile ?
                        <ChatListComp />
                    :
                        <Chat/>
                }
                
            </div>
            <div className="">
                <Outlet />
            </div>
            
            {/* <Footer/> */}
        </div>
    );
};

export default HomeLayout;
