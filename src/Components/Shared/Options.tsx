
interface optionsProp {
    optionsList:{
        title: string;
        icon?: JSX.Element;
        action:Function;
    }[]
}

const Options = ({optionsList}:optionsProp, className:string) => {
    
    return (
        <div id="options-list" className=''>
        {
            optionsList.map((setting: any, index:number)=>
                <button key={index} onClick={() => setting.action()} className={className + 'capitalize text-[var(--text-primary)] text-lg flex items-center gap-5 p-3 w-full hover:bg-[var(--accent-color)] hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg'}>
                    <span>{setting.icon}</span>
                    <span>{setting.title}</span>
                </button>
            )
        }
        </div>
    )
}

export default Options