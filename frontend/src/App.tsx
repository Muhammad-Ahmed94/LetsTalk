import { Navigate, Route, Routes } from "react-router";

import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import SignupPage from "./pages/Signup";
import useUserStore from "./stores/useUserStore";

const App = () => {
  const { user } = useUserStore();

  return (
    <div className="p-4 min-h-screen flex-center">
        <Routes>
          <Route path="/" element={<Home />}/>

          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

          <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        </Routes>
    </div>
  );
};

export default App;
