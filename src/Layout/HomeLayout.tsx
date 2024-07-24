
import { Outlet } from "react-router-dom";
//import Footer from "../Components/Shared/Footer";
import { useAppSelector } from "../redux/hooks";
import { ChatListComp, Profile, Settings } from "../Components";

const HomeLayout = () => {
    const { showProfile, showNotifications, showSettings } = useAppSelector((state) => state.profile)
    return (
        <div className="h-[100vh] flex bg-[var(--bg-color)]">
            <div className="hidden sm:block w-[25vw] min-w-[320px] h-full p-3 shadow-[inset_-10px_0px_20px_0px_#00000024]">
                {
                    showProfile ?
                        <Profile/>
                    :
                    showSettings ?
                        <Settings/>
                    :
                        <ChatListComp />
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
