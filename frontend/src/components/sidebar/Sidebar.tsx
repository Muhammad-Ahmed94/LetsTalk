import Conversations from './Conversations'
import SearchInput from './SearchInput'
import LogOutButton from './LogOutButton'


const Sidebar = () => {
  return (
    <div className='border-r border-slate-400 flex flex-col p-4'>
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <LogOutButton />
    </div>
  )
}

export default Sidebar