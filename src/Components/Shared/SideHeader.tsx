import { FaChevronLeft } from "react-icons/fa"

interface props {
    backIcon?: JSX.Element;
    backFn?: Function, 
    title: string, 
    headerClassName?: string, 
    backBtnClassName?: string, 
    titleClassName?: string
}

const SideHeader = ({backIcon, backFn, title, headerClassName, backBtnClassName, titleClassName}:props) => {

    return (
        <header className={`${headerClassName} flex justify-start items-center my-3 gap-5 text-[var(--text-primary-light)] dark:text-[var(--text-primary)]`}>
            <button onClick={() => {backFn? backFn(): null}} className={`${backBtnClassName} dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)] hover:bg-[var(--accent-color-light)] dark:hover:bg-[var(--accent-color)] rounded-full p-2`}>
                {backIcon? backIcon : <FaChevronLeft /> }
            </button>
            <h5 className={`${titleClassName} capitalize`}>
                {title}
            </h5>
        </header>
    )
}

export default SideHeader