import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import useUserStore from "../stores/useUserStore";
import Formfield from "../components/Formfield";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const { signup } = useUserStore();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    signup(
      formData.name,
      formData.email,
      formData.password,
    )
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
            <Formfield
              title="Username"
              type="text"
              placeholder="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <Formfield
              title="Email"
              type="email"
              placeholder="exmaple@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <Formfield
              title="Password"
              type="password"
              placeholder="*******"
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
