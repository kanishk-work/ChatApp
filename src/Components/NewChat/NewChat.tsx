import { useAppDispatch } from "../../Redux/hooks"
import { setShowNewChat } from "../../Redux/slices/profileSlice"
import SideHeader from "../Shared/SideHeader"

const NewChat = () => {
    const dispatch = useAppDispatch();
    return (
        <>
            <SideHeader title="new chat" backFn={() => dispatch(setShowNewChat(false))} />
        </>
    )
}

export default NewChat