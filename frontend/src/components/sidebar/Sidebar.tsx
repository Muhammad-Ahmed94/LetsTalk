import React from 'react'
import Conversations from './Conversations'
import SearchInput from './SearchInput'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div>
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
    </div>
  )
}

export default Sidebar