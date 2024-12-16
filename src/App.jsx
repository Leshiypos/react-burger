import "./App.css";
import AppHeader from "./components/app-header";
import BurgerIngredients from "./components/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor";

function App() {
  return (
    <>
      <AppHeader />
      <main className="al_cen">
        <section>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Соберите бургер
          </h1>
          <BurgerIngredients />
        </section>

        <section>
          <BurgerConstructor />
        </section>
      </main>
    </>
  );
}

export default App;
