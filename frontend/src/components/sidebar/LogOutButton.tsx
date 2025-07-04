import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router";

import useUserStore from "../../stores/useUserStore";

const LogOutButton = () => {
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
        className="cursor-pointer bg-green_secondary rounded font-bold px-4 py-2"
        onClick={handleLogout}
      >
        <BiLogOut className="w-6 h-6 text-green_primary font-bold cursor-pointer" />
        {}
      </button>
    </div>
  );
};

export default LogOutButton;
