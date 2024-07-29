
interface props {
    optionsList: {
        title: string;
        icon?: JSX.Element;
        action: Function;
    }[],

    btnClassName?: string,
}

const Options = ({ optionsList, btnClassName }: props) => {

    return (
        <div id="options-list" className=''>
            {
                optionsList.map((option: any, index: number) =>
                    <button key={index} onClick={() => option.action()} className={`${btnClassName} capitalize text-[var(--text-primary)] text-lg flex items-center gap-5 p-3 w-full hover:bg-[var(--accent-color)] hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg`}>
                        <span>{option.icon}</span>
                        <span>{option.title}</span>
                    </button>
                )
            }
        </div>
    )
}

export default Options