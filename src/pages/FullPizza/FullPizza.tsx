import { useEffect, useState } from "react";
import style from "./FullPizza.module.sass";
import { useParams } from "react-router";
import axios from "axios";

type FullPizzaProps = {
  src: string;
  name: string;
  description: string;
};

export default function FullPizza() {
  const [pizza, setPizza] = useState<FullPizzaProps>();
  const { id } = useParams();

  useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://efe9deefd29e1c95.mokky.dev/pizza/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPizza();
  }, [id]);
  if (!pizza) {
    return "Загрузка";
  }
  return (
    <div className={style.fullpizza}>
      <img className={style.fullpizza__img} src={pizza.src} alt={pizza.src} />
      <div>
        <h2 className={style.fullpizza__name}>{pizza.name}</h2>
        <h4 className={style.fullpizza__text}>{pizza.description}</h4>
      </div>
    </div>
  );
}
