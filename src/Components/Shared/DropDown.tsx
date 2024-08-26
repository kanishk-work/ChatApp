import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ReactNode } from "react";

interface props {
  optionsList: {
    name: string;
    icon?: JSX.Element;
    action?: Function;
  }[];
  btnClassName?: string;
  itemClassName?: string;
  dropBoxClassName?: string;
  triggerElement: ReactNode;
}

const DropDown = ({
  optionsList,
  btnClassName,
  itemClassName,
  dropBoxClassName,
  triggerElement,
}: props) => {
  return (
    <Menu as="div" className={`relative inline-block text-left`}>
      <div>
        <MenuButton className={`${btnClassName} `}>{triggerElement}</MenuButton>
      </div>

      <MenuItems
        transition
        className={`${dropBoxClassName} absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-[var(--accent-color-light)] dark:bg-[var(--accent-color)] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}
      >
        <div className="py-1">
          {optionsList.map((option: any, index: number) => (
            <MenuItem key={index}>
              <button
                onClick={() => {
                  option.action() ? option.action() : null;
                }}
                className={`${itemClassName} capitalize text-left w-full flex gap-3 px-4 py-2 text-sm text-[var(--text-secondary-light)] dark:text-[var(--text-secondary)] data-[focus]:bg-[var(--bg-color-light)] dark:data-[focus]:bg-[var(--bg-color)] data-[focus]:text-black dark:data-[focus]:text-white`}
              >
                {option.icon} {option.name}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default DropDown;
