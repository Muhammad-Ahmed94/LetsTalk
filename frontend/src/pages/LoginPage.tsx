import { useState, type FormEvent } from "react";
import { Link } from "react-router";

import useUserStore from "../stores/useUserStore";

import Formfield from "../components/Formfield";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, login, logout } = useUserStore();

  const handleLogout = () => {
    logout();
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex-col-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500">To LetsTalk</span>
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <Formfield
              title="Email"
              type="email"
              placeholder="your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Formfield
              title="Password"
              type="password"
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <p>
              Dont have an account{" "}
              <Link to="/signup" className="text-blue-800 underline">
                Sign up here
              </Link>
            </p>
          </div>

          <div>
            <button className="cursor-pointer bg-blue-400 text-white px-4 py-2">
              Login now
            </button>
          </div>
        </form>
        <div>
          <button
            className="cursor-pointer bg-blue-400 text-white px-4 py-2"
            onClick={handleLogout}
          >
            logout now test button
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
