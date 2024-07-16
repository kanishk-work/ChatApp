import { FC } from 'react';
import { Link } from 'react-router-dom';

const chats = [
  {
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Akhil",
    text: "hello guys",
    time: "11:40"

  },
  {
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Akhil",
    text: "hello guys",
    time: "11:40"

  },
  {
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Akhil",
    text: "hello guys",
    time: "11:40"

  },
  {
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Akhil",
    text: "hello guys",
    time: "11:40"

  },

]

const Chats: FC<{}>= () => {
  return (
      <div>
      {
        chats.map((chat)=>
          <Link to="/" className='flex items-center justify-center text-white w-full mb-2 p-1.5 hover:shadow-[0px_0px_20px_14px_#00000024] rounded-lg'>
            <img src={chat.img} alt="user profile pic" className='object-contain h-9 w-9 rounded-full items-start flex-shrink-0 mr-3' />
            <div className='w-full'>
              <div className='w-full flex justify-between'>
                <span className='font-semibold text-sm'>{chat.name}</span>
                <span className='text-xs'>{chat.time}</span>
              </div>
              <span className='text-xs'>{chat.text}</span>
            </div>
          </Link>
        )
      }
      </div>
    
  )
}

export default Chats