import { useState, type FormEvent } from "react";
import { Link } from "react-router";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex-col-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
          <span className="text-blue-500"> To LetsTalk</span>
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label className="label p-2" aria-label="username">
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              className="border"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2" aria-label="password">
              email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="border"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2" aria-label="password">
              password
            </label>
            <input
              type="password"
              placeholder="password"
              className="border"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div>
            <p>
              Already a user{" "}
              <Link to="/login" className="text-blue-800 underline">
                Login here
              </Link>
            </p>
          </div>

          <div>
            <button className="cursor-pointer bg-blue-400 text-white px-4 py-2">
              Signup now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
