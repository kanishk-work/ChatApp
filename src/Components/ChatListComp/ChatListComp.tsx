import Chats from "./Chats"
import ProfileAndSearch from "./ProfileAndSearch"


const ChatListComp = () => {
  return (
    <div className="h-full w-full overflow-auto ">

        <ProfileAndSearch/>
        <Chats/>
    </div>
  )
}

export default ChatListComp