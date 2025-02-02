import { useState } from "react";
import style from "./ProductCard.module.sass";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { Link } from "react-router";
import { PizzasInterface } from "../../interface/PizzasInterface";

const typeNames = ["традиционное", "тонкое"];
type CartItem = {
  id: number;
  name: string;
  price: number;
  src: string;
  type: string;
  size: number;
  count: number;
};

export default function ProductCard(props: PizzasInterface) {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const changeType = (index: number) => {
    setActiveType(index);
  };
  const changeSize = (index: number) => {
    setActiveSize(index);
  };

  const onClickAdd = () => {
    const item: CartItem = {
      id: props.id,
      name: props.name,
      price: props.price[activeSize],
      src: props.src,
      type: typeNames[activeType],
      size: props.size[activeSize],
      count: 1,
    };
    dispatch(addItem(item));
  };

  return (
    <div className={style.product} key={props.id}>
      <Link className={style.product_a} to={`/pizza/${props.id}`}>
        <img className={style.product_img} src={props.src} alt={props.src} />
      </Link>
      <h3 className={style.title}>{props.name} </h3>
      <div className={style.choice}>
        <div className={style.choice__type}>
          {props.type.map((type) => (
            <p
              key={type}
              onClick={() => changeType(type)}
              className={activeType === type ? style.active : ""}
            >
              {typeNames[type]}
            </p>
          ))}
        </div>
        <div className={style.choice__size}>
          {props.size.map((size, index) => (
            <p
              key={index}
              onClick={() => changeSize(index)}
              className={activeSize === index ? style.active : ""}
            >
              {size} см.
            </p>
          ))}
        </div>
      </div>
      <div className={style.order}>
        <p className={style.order__price}>от {props.price[activeSize]} ₽</p>
        <button className={style.order__btn} onClick={onClickAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}
