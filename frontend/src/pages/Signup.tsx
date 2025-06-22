import { type FormEvent,useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

import Formfield from "../components/Formfield";
import useUserStore from "../stores/useUserStore";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const navigate = useNavigate();
  const { signup } = useUserStore();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(!formData.gender) {
      alert("Please select a gender")
      return
    };

    signup(
      formData.name,
      formData.email,
      formData.password,
      formData.gender
    )
    toast.success("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="flex-col-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-black_full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-green_secondary bg-black_light p-2 mb-2 rounded">
          Signup To
          <span className="text-green_primary"> LetsTalk</span>
        </h1>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 items-start">
          <div>
            <Formfield
              title="Username"
              type="text"
              placeholder="your name"
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
              placeholder="example@gmail.com"
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

          <div className="flex gap-4 px-2 my-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              Female
            </label>
          </div>

          <div>
            <p className="text-green_secondary">
              Already a user{" "}
              <Link to="/login" className="text-green_primary underline">
                Login here
              </Link>
            </p>
          </div>

          <div>
            <button className="cursor-pointer bg-green_secondary text-black_light px-4 py-2 rounded">
              Signup now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
