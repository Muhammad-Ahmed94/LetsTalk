import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";

import useUserStore from "../stores/useUserStore";

import Formfield from "../components/Formfield";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      console.error("Error logging in client. Please check credentials");
      toast.error(error.message || "Error logging in. Please enter valid credentials");
    }
  };

  return (
    <div className="flex-col-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-black_full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center bg-black_light text-green_secondary rounded p-2 mb-2">
          Login To
          <span className="text-green_primary"> { }LetsTalk</span>
        </h1>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 items-start">
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
              className="cursor-pointer bg-green_secondary text-black_light rounded px-4 py-2 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login now"}
            </button>
          </div>
        </form>

        {/* Navigate to signup page */}
        <div className="mt-4">
          <p className="text-green_secondary">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green_primary underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;