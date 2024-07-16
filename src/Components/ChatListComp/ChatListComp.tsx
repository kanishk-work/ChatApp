import Chats from "./Chats"
import Search from "./ProfileAndSearch"

const ChatListComp = () => {
  return (
    <div className="h-full overflow-auto p-3 bg-gradient-to-tr from-slate-700 to-slate-700 shadow-[inset_-20px_0px_20px_0px_#00000024]">

        <Search/>
        <Chats/>
    </div>
  )
}

export default ChatListComp