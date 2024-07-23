import Chats from "./Chats"
import ProfileAndSearch from "./ProfileAndSearch"


const ChatListComp = () => {
  return (
    <div className="h-full w-full overflow-auto p-3 shadow-[inset_-10px_0px_20px_0px_#00000024]">

        <ProfileAndSearch/>
        <Chats/>
    </div>
  )
}

export default ChatListComp