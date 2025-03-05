import AppHeader from "./components/app-header";
import { useEffect } from "react";
import { getIngredientsAction } from "./services/ingredients/actions";
import Home from "./pages/home";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import Profile from "./pages/profile";
import ResetPassword from "./pages/reset-password";
import { OnlyAuth, OnlyUnAuth } from "./components/protected-route";
import { checkUserAuth } from "./services/user/action";
import ProfileForm from "./pages/profile-form";
import IngredientDetails from "./components/ingredient-details";
import Modal from "./components/modal";
import Feed from "./pages/feed";
import { useDispatch } from "./hooks/hooks";
import OrdersProfile from "./pages/orders-profile";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(getIngredientsAction());
  }, []);

  useEffect(() => {
    //@ts-ignore
    dispatch(checkUserAuth());
  }, []);

  const handleModalClose = () => {
    navigate(-1);
  };
  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />
        <Route path="/feed" element={<Feed />} />
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
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route path="" element={<ProfileForm />} />
          <Route path="orders" element={<OrdersProfile />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal title="Детали ингридиента" onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
