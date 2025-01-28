import AppHeader from "./components/app-header";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredientsAction } from "./services/ingredients/actions";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import Profile from "./pages/profile";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsAction());
  }, []);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
