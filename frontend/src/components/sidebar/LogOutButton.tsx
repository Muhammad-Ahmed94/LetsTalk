import React from 'react'
import { BiLogOut } from "react-icons/bi";

type Props = {}

const LogOutButton = (props: Props) => {
  return (
    <div className="mt-auto">
      <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
    </div>
  );
}

export default LogOutButton