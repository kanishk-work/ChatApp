import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setShowProfile, setShowSettings } from '../../redux/slices/profileSlice'
import { FaBell, FaChevronLeft, FaKeyboard, FaLock, FaPalette, FaQuestionCircle } from "react-icons/fa"

const Settings = () => {
    const settings_list = [
        {
            title: "notifications",
            icon:<FaBell/>,
        },
        {
            title: "privacy",
            icon: <FaLock/>,
        },
        {
            title: "theme",
            icon: <FaPalette/>
        },
        {
            title: "keyboard shortcuts",
            icon: <FaKeyboard/>,
        },
        {
            title: "help",
            icon: <FaQuestionCircle/>,
        }
    ]

    const activeUser = useAppSelector((state) => state.activeUser)
    const dispatch = useAppDispatch();


    return (
        <div>
            <header className="flex justify-start items-center my-3 gap-5 text-lg text-[var(--text-primary)]">
                <button onClick={() => dispatch(setShowSettings(false))} className='text-[var(--text-secondary)] hover:bg-[var(--accent-color)] rounded-full p-2'>
                    <FaChevronLeft />
                </button>
                <h1>
                    Settings
                </h1>
            </header>
            <button onClick={() => dispatch(setShowProfile(true))} className='w-full flex items-center gap-5 p-2 hover:bg-[var(--accent-color)] rounded-lg'>
                <img src={activeUser.profilePic} alt="user profile pic" className='object-contain h-16 w-16 rounded-full items-start flex-shrink-0' />
                <div className='capitalize text-left text-[var(--text-primary)] leading-none'>
                    <h1 className='text-lg'>{activeUser.name}</h1>
                    <span className='text-sm text-[var(--text-secondary)]'>{activeUser.bio}</span>
                </div>
            </button>

            <div id="settings-list" className=''>
                {
                    settings_list.map((setting)=>
                        <button className='capitalize text-[var(--text-primary)] text-lg flex items-center gap-5 p-3 w-full hover:bg-[var(--accent-color)] hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg'>
                            <span>{setting.icon}</span>
                            <span>{setting.title}</span>
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Settings