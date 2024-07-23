import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BiChevronDown, BiDotsVerticalRounded, BiSearch } from "react-icons/bi"

const ProfileAndSearch = () => {
  const profile = {
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "kanishk",
  }
  return (
    <div className="w-full flex items-center justify-between mb-3">
      <img src={profile.img} alt="user profile pic" className='object-contain h-8 w-8 rounded-full items-start flex-shrink-0' />

      <div className="relative"> 
            <input type="text" className="placeholder-slate-400 bg-[var(--accent-color)] shadow-sm text-slate-200 rounded focus:outline-none py-1 px-3 focus:shadow-lg" placeholder="Search..."/> 
            <BiSearch className="absolute right-3 top-2 text-slate-400"/>
      </div>

      {/* <BiDotsVerticalRounded className="text-2xl text-slate-400 hover:bg-[var(--accent-color)] rounded-full"/> */}
      
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="flex items-center text-2xl p-1 text-slate-400 rounded-full data-[hover]:bg-[var(--accent-color)] data-[open]:bg-[var(--accent-color)] data-[focus]:outline-1 data-[focus]:outline-white">
            <BiDotsVerticalRounded className=""/>
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[var(--accent-color)] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-slate-200 data-[focus]:bg-[var(--bg-color)] data-[focus]:text-white"
              >
                New Group
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-slate-200 data-[focus]:bg-[var(--bg-color)] data-[focus]:text-white"
              >
                Settings
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-slate-200 data-[focus]:bg-[var(--bg-color)] data-[focus]:text-white"
              >
                License
              </a>
            </MenuItem>
            {/* <form action="#" method="POST">
              <MenuItem>
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-slate-200 data-[focus]:bg-[var(--bg-color)] data-[focus]:text-white"
                >
                  Sign out
                </button>
              </MenuItem>
            </form> */}
          </div>
        </MenuItems>
      </Menu>
    </div>
  )
}

export default ProfileAndSearch