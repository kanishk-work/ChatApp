import { FaChevronLeft } from "react-icons/fa"


const SideHeader = ({backFn, title}:{backFn:Function, title: string }) => {

    return (
        <header className="flex justify-start items-center my-3 gap-5 text-lg text-[var(--text-primary)]">
            <button onClick={() => backFn()} className='text-[var(--text-secondary)] hover:bg-[var(--accent-color)] rounded-full p-2'>
                <FaChevronLeft />
            </button>
            <h1 className='capitalize'>
                {title}
            </h1>
        </header>
    )
}

export default SideHeader