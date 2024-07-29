import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setShowProfile, setShowSettings } from '../../redux/slices/profileSlice'
import { FaBell, FaKeyboard, FaLock, FaPalette, FaQuestionCircle } from "react-icons/fa"
import { setShowHelp, setShowNotification, setShowPrivacy, setShowShortcuts, setShowTheme } from '../../redux/slices/settingsSlice'
import SideHeader from '../Shared/SideHeader'
import Options from '../Shared/Options'

const Settings = () => {
    const dispatch = useAppDispatch();

    const settings_list= [
        {
            title: "notifications",
            icon: <FaBell />,
            action: () => dispatch(setShowNotification(true)),
        },
        {
            title: "privacy",
            icon: <FaLock />,
            action: () => dispatch(setShowPrivacy(true)),
        },
        {
            title: "theme",
            icon: <FaPalette />,
            action: () => dispatch(setShowTheme(true)),
        },
        {
            title: "keyboard shortcuts",
            icon: <FaKeyboard />,
            action: () => dispatch(setShowShortcuts(true)),
        },
        {
            title: "help",
            icon: <FaQuestionCircle />,
            action: () => dispatch(setShowHelp(true)),
        }
    ]

    const activeUser = useAppSelector((state) => state.activeUser);

    return (
        <div>
            <SideHeader backFn={() => dispatch(setShowSettings(false))} title='settings' />

            <button onClick={() => dispatch(setShowProfile(true))} className='w-full flex items-center gap-5 p-2 hover:bg-[var(--accent-color)] rounded-lg'>
                <img src={activeUser.profilePic} alt="user profile pic" className='object-contain h-16 w-16 rounded-full items-start flex-shrink-0' />
                <div className='capitalize text-left text-[var(--text-primary)] leading-none'>
                    <h1 className='text-lg'>{activeUser.name}</h1>
                    <span className='text-sm text-[var(--text-secondary)]'>{activeUser.bio}</span>
                </div>
            </button>

            <Options optionsList={settings_list} btnClassName=''/>
        </div>
    )
}

export default Settings