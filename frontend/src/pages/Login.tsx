import { useState, type FormEvent } from "react";
import { Link } from "react-router";

type Props = {};

const Login = (props: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-col-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label className="label p-2" aria-label="username">Username</label>
            <input
              type="email"
              placeholder="username"
              className="border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2" aria-label="password">password</label>
            <input
              type="password"
              placeholder="password"
              className="border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <p>Dont have an account <Link to="/signup" className="text-blue-800 underline">Sign up here</Link></p>
          </div>

          <div>
            <button className="cursor-pointer bg-blue-400 text-white px-4 py-2">Login now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
