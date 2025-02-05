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
import ResetPassword from "./pages/reset-password";
import { OnlyAuth, OnlyUnAuth } from "./components/protected-route";
import { checkUserAuth } from "./services/user/action";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsAction());
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
      </Routes>
    </>
  );
}

export default App;
