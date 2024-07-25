import { useAppSelector } from "../redux/hooks";
import { ChatListComp, Help, Profile, Settings } from "../Components";
import ChatWindow from "../Components/ChatWindow/ChatWindow";
import { useAppContext } from "../Context/AppContext";
const HomeLayout = () => {
      const { view, currentChatId } = useAppContext();
    const { showProfile, showNotifications, showSettings } = useAppSelector((state) => state.profile)
    const {showHelp, showNotification, showPrivacy, showShortcuts, showTheme} = useAppSelector((state) => state.settings);

    return (
        <div className="h-[100vh] flex bg-[var(--bg-color)]">
            <div className="hidden sm:block w-[25vw] min-w-[320px] h-full p-3 shadow-[inset_-10px_0px_20px_0px_#00000024]">
                {
                    showProfile ?
                        <Profile/>
                    :
                    showNotification?
                    null
                    :
                    showPrivacy?
                    null
                    :
                    showShortcuts?
                    null
                    :
                    showTheme?
                    null
                    :
                    showHelp?
                        <Help/>
                    :
                    showSettings ?
                        <Settings/>
                    :
                        <ChatListComp />
                }
                
            </div>
        <div className="flex-1 h-full">
        {view === "chatWindow" && currentChatId !== null && (
          <ChatWindow chatId={currentChatId} />
        )}
      </div>
            
    </div>
    );
};

export default HomeLayout;
