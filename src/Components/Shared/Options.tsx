
interface props {
    optionsList: {
        title: string;
        icon?: JSX.Element;
        action?: Function;
    }[],

    btnClassName?: string,
    btnStyle?: React.CSSProperties,
}

const Options = ({ optionsList, btnClassName ,btnStyle}: props) => {

    return (
        <div id="options-list" className=''>
            {
                optionsList.map((option: any, index: number) =>
                    <button key={index} onClick={() => { option.action() ? option.action() : null }} style={{...btnStyle}} className={`${btnClassName} capitalize dark:text-[var(--text-primary)] text-[var(--text-primary-light)] flex items-center gap-5 p-3 w-full dark:hover:bg-[var(--accent-color)] hover:bg-[var(--accent-color-light)] hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg`}>
                        <span>{option.icon}</span>
                        <span>{option.title}</span>
                    </button>
                )
            }
        </div>
    )
}

export default Options