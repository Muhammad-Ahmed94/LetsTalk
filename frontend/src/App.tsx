import { Navigate, Route, Routes } from "react-router";
import { Toaster } from 'react-hot-toast';

import SignupPage from "./pages/Signup";
import useUserStore from "./stores/useUserStore";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const { user } = useUserStore();

  return (
    <div className="p-4 min-h-screen flex-center">
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />

          {/* <Route path="/login" element={user ? <Login /> : <Navigate to="/" />} /> */}
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

          <Route path="/signup" element={!user ? <SignupPage/> : <Navigate to="/" />}/>
        </Routes>
        <Toaster  />
    </div>
  );
};

export default App;
