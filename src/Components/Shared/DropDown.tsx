import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BiDotsVerticalRounded } from "react-icons/bi"

interface props {
    optionsList: {
        name: string;
        icon?: JSX.Element;
        action?: Function;
    }[],
    btnClassName?: string,
    itemClassName?: string,
    dropBoxClassName?: string,
}

const DropDown = ({ optionsList, btnClassName, itemClassName }: props) => {
    return (
        <Menu as="div" className={`relative inline-block text-left`}>
            <div>
                <MenuButton className={`${btnClassName} flex items-center text-2xl py-1 text-[var(--text-secondary-light)] dark:text-[var(--text-secondary)] rounded-full data-[hover]:bg-[var(--accent-color-light)] dark:data-[hover]:bg-[var(--accent-color)] data-[open]:bg-[var(--accent-color-light)] dark:data-[open]:bg-[var(--accent-color)] data-[focus]:outline-1 data-[focus]:outline-white`}>
                    <BiDotsVerticalRounded className="" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[var(--accent-color-light)] dark:bg-[var(--accent-color)] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    {
                        optionsList.map((option: any, index: number) =>
                            <MenuItem>
                                <button
                                    key = {index}
                                    onClick={() => {option.action()? option.action() : null}}
                                    className={`${itemClassName} capitalize text-left w-full flex gap-3 px-4 py-2 text-sm text-[var(--text-secondary-light)] dark:text-[var(--text-secondary)] data-[focus]:bg-[var(--bg-color-light)] dark:data-[focus]:bg-[var(--bg-color)] data-[focus]:text-black dark:data-[focus]:text-white`}
                                >
                                    {option.icon} {option.name}
                                </button>
                            </MenuItem>
                        )
                    }
                </div>
            </MenuItems>
        </Menu>
    )
}

export default DropDown