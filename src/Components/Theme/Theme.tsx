import { useAppDispatch } from "../../redux/hooks"
import SideHeader from "../Shared/SideHeader"
import { setShowTheme } from '../../redux/slices/settingsSlice'
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Options from "../Shared/Options";


const Theme = () => {
    const [dark, setDark] = useState(false);    
    const icon = dark? <FaMoon/>:<FaSun className="text-yellow-500"/>
    const theme_list= [
        {
            title: "toggle theme",
            icon: icon,
            action: () => darkModeHandler(),
        },
    ]

    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setDark(true);
        }
    })

    const darkModeHandler = () => {
        setDark(!dark);
        document.documentElement.classList.toggle("dark");
    }

    const dispatch = useAppDispatch();

    return (
        <div>
            <SideHeader title="theme" backFn={() => dispatch(setShowTheme(false))} />
            {/* <div className="flex justify-between items-center p-3">
                <h3 className={`text-lg ${dark? 'text-[var(--text-primary)]':'text-[var(--text-secondary-light)]'}`}>Theme mode</h3>
                <button className="dark:text-slate-100 text-green-400 text-xl" onClick={() => darkModeHandler()}>
                    {
                        dark && <IoMoon /> // render sunny when dark is true
                    }
                    {
                        !dark && <IoSunny /> // render moon when dark is false
                    }
                </button>
            </div> */}
            <Options optionsList={theme_list}/>
            
        </div>
    )
}

export default Theme