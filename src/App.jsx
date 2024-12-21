import "./App.css";
import AppHeader from "./components/app-header";
import BurgerIngredients from "./components/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor";
import { useState, useEffect } from "react";

function App() {
  const [button, setButton] = useState("consctructor");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const dataIp = "https://norma.nomoreparties.space/api/ingredients";
      try {
        setIsLoading(true);
        const response = await fetch(dataIp);
        const ingridient = await response.json();
        setData(Object.values(ingridient.data));
        setIsLoading(false);
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <AppHeader active={button} onChange={(current) => setButton(current)} />
      <main className="al_cen">
        <section>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Соберите бургер
          </h1>
          {!hasError && !isLoading && <BurgerIngredients data={data} />}
          {hasError && <p>Произошла ошибка загрузки данных...</p>}
        </section>

        <section>
          {!hasError && !isLoading && <BurgerConstructor data={data} />}
          {hasError && <p>Произошла ошибка загрузки данных...</p>}
        </section>
      </main>
    </>
  );
}

export default App;
