import Chats from "./Chats"
import ProfileAndSearch from "./ProfileAndSearch"
import ProfileAndSearch2 from "./ProfileAndSearch2"


const ChatListComp = () => {
  return (
    <div className="h-full w-full overflow-auto ">

        <ProfileAndSearch/>
        <ProfileAndSearch2/>
        <Chats/>
    </div>
  )
}

export default ChatListComp