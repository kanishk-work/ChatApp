import { BiSearch } from "react-icons/bi"

const AddMembers = ({ submitFn }: { submitFn: Function }) => {
    return (
        <div>
            <div className="relative grow">
                <input type="text" className="w-full bg-[var(--accent-color-light)] dark:bg-[var(--accent-color)] shadow-sm dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)] rounded focus:outline-none py-1 px-3 focus:shadow-lg" placeholder="Search..." />
                <BiSearch className="absolute right-3 top-2 text-[var(--text-secondary)]" />
            </div>
            <button className="mt-2 py-1 px-2 rounded-lg dark:bg-accent-color bg-accent-color-light dark:text-text-secondary text-text-secondary-light text-lg" onClick={() => submitFn()}> Add </button>
        </div>
    )
}

export default AddMembers