import { Link } from "react-router";
import style from "./Cart.module.sass";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/CartItem/CartItem";
import { clearItems, selectCart } from "../../redux/slices/cartSlice";
import axios from "axios";
import { useState } from "react";

export default function Cart() {
  const { items, totalPrice } = useSelector(selectCart);
  const [isOrder, setIsORder] = useState(false);

  const totalCount = items.reduce(
    (sum: number, item: { count: number }) => sum + item.count,
    0
  );
  const dispatch = useDispatch();

  const onClickClear = () => {
    if (window.confirm("Очистить корзину?")) {
      dispatch(clearItems());
    }
  };

  function cartOrder() {
    axios.post("https://efe9deefd29e1c95.mokky.dev/cart", { items });
    dispatch(clearItems());
    setIsORder(true);
  }

  return (
    <div className={style.cart}>
      {items.length === 0 ? (
        <div className={style.emptyCart}>
          {isOrder ? (
            <>
              <h2 className={style.emptyCart__title}>
                Заказ оформлен! &#128512;
              </h2>
              <p className={style.emptyCart__text}>
                Ваш заказ скоро будет передан курьерской доставке
              </p>
            </>
          ) : (
            <>
              <h2 className={style.emptyCart__title}>Корзина пустая 😕</h2>
              <p className={style.emptyCart__text}>
                Вероятней всего, вы не заказывали ещё пиццу. <br /> Для того,
                чтобы заказать пиццу, перейди на главную страницу.
              </p>
            </>
          )}
          <img
            className={style.emptyCart__img}
            src="/shopping-cart-colour 1.svg"
            alt="shopping-cart-colour 1.svg"
          />
          <Link to="/">
            {" "}
            <button onClick={(() => setIsORder(false))} className={style.emptyCart__btn}>Вернуться назад</button>
          </Link>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.container__title}>
            <h2>
              <img src="./cart_icon.svg" alt="cart_icon.svg" />
              Корзина
            </h2>
            <button className={style.container__btn} onClick={onClickClear}>
              <img src="./cart_delelted.svg" alt="cart_delelted.svg" />
              Очистить корзину
            </button>
          </div>
          <div className={style.container__wrapper}>
            {items.map((i, index) => (
              <CartItem key={index} index={index} {...i} />
            ))}
          </div>

          <div className={style.container__discritpion}>
            <div>
              <p>
                Всего пицц: <span>{totalCount}</span>
              </p>
              <Link to="/">
                {" "}
                <button className={style.container__back}>
                  {" "}
                  <img src="./button_back.svg" alt="button_back.svg" />{" "}
                  Вернуться назад
                </button>
              </Link>
            </div>
            <div>
              <p>
                Сумма заказа: <span>{totalPrice} &#8381;</span>
              </p>
              <button onClick={cartOrder} className={style.container__order}>
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
