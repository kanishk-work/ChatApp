import { FaChevronLeft } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setShowProfile } from '../../redux/slices/profileSlice'

const Profile = () => {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector((state) => state.activeUser)

  return (
    <div>
      <header className="flex justify-start items-center my-3 gap-5 text-lg text-[var(--text-primary)]">
        <button onClick={() => dispatch(setShowProfile(false))} className='text-[var(--text-secondary)] hover:bg-[var(--accent-color)] rounded-full p-2'>
          <FaChevronLeft />
        </button>
        <h1>
           Profile
        </h1>
      </header>
      <div onClick={() => dispatch(setShowProfile(true))} className='w-full flex items-center justify-center p-2 hover:bg-[var(--accent-color)] rounded-lg'>
        <img src={activeUser.profilePic} alt="user profile pic" className='object-contain h-40 w-auto rounded-full flex-shrink-0'/>
      </div>
      
      <div id="userinfo" className='capitalize text-[var(--text-primary)] text-lg'>
        <div className='flex flex-col items-start gap-2 p-3 w-full hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg'>
          <span className='text-[var(--text-secondary)]'>name</span>
          <span>{activeUser.name}</span>
        </div>
        <div className='flex flex-col items-start gap-2 p-3 w-full hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg'>
          <span className='text-[var(--text-secondary)]'>bio</span>
          <span>{activeUser.bio}</span>
        </div>
      </div>
    </div>

  )
}

export default Profile
