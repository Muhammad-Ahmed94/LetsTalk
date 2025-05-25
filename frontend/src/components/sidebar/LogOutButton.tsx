import React from "react";
import { BiLogOut } from "react-icons/bi";
import useUserStore from "../../stores/useUserStore";
import { useNavigate } from "react-router";

type Props = {};

const LogOutButton = (props: Props) => {
  const { loading, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="mt-auto">
      <button
        disabled={loading}
        className="cursor-pointer bg-blue-400 text-white px-4 py-2"
        onClick={handleLogout}
      >
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
        {}
      </button>
    </div>
  );
};

export default LogOutButton;
