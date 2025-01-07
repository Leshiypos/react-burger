import "./App.css";
import AppHeader from "./components/app-header";
import BurgerIngredients from "./components/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIngredientsAction } from "./services/ingredients/actions";
import { getIngredientsState } from "./services/ingredients/selectors";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [button, setButton] = useState("consctructor");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsAction());
  }, []);

  const { ingredients, error, loading } = useSelector(getIngredientsState);

  return (
    <>
      <AppHeader active={button} onChange={(current) => setButton(current)} />
      <DndProvider backend={HTML5Backend}>
        <main className="al_cen">
          {loading ? (
            <p>Загрузка данных</p>
          ) : error ? (
            <p>Произошла ошибка загрузки данных</p>
          ) : ingredients.length > 0 ? (
            <section>
              <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
              </h1>
              <BurgerIngredients />
            </section>
          ) : (
            <p>Нет данных</p>
          )}

          {loading ? (
            <p>Загрузка данных</p>
          ) : error ? (
            <p>Произошла ошибка загрузки данных</p>
          ) : ingredients.length > 0 ? (
            <section>
              <BurgerConstructor ingredients={ingredients} />
            </section>
          ) : (
            <p>Нет данных</p>
          )}
        </main>
      </DndProvider>
    </>
  );
}

export default App;
