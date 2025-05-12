import { Route, Routes } from "react-router";

import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import SignupPage from "./pages/Signup";

const App = () => {
  return (
    <div className="p-4 min-h-screen flex-center">
        <Routes>
          <Route path="/" element={<Home />}/>

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<SignupPage />} />
        </Routes>
    </div>
  );
};

export default App;
