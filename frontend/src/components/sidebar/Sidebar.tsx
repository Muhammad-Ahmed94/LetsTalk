import React from 'react'
import Conversations from './Conversations'
import SearchInput from './SearchInput'
import LogOutButton from './LogOutButton'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className='border-r border-slate-500 flex flex-col p-4'>
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <LogOutButton />
    </div>
  )
}

export default Sidebar