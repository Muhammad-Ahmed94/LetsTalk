import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";

import useUserStore from "../stores/useUserStore";

import Formfield from "../components/Formfield";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, login, loading } = useUserStore();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.log(user);
      try {
        console.log(user);
        await login(email, password); // if unknow error comes trying using await here
        navigate("/");
        console.log(user);
      } catch (error) {
        console.error("Error logging in client. Please check credentials");
        toast.error("Error logging in. Please enter valid credentials");
      }
    } else {
      console.log(`${user} is already logged in.`);
      toast.error("user already logged in");
    }
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
            <button
              className="cursor-pointer bg-blue-400 text-white px-4 py-2"
              disabled={loading}
            >
              Login now
            </button>
          </div>
        </form>

        {/* Navigate to signup page */}
        <div>
          <p>
            Dont have an account{" "}
            <Link to="/signup" className="text-blue-800 underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
