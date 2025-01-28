import styles from "./home.module.css";
import { DndProvider } from "react-dnd";
import BurgerIngredients from "../components/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor";
import { useSelector } from "react-redux";
import { getIngredientsState } from "../services/ingredients/selectors";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const { ingredients, error, loading } = useSelector(getIngredientsState);
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
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
            <BurgerConstructor />
          </section>
        ) : (
          <p>Нет данных</p>
        )}
      </main>
    </DndProvider>
  );
}
