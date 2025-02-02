import { Link, useLocation } from "react-router";
import styles from "./Header.module.sass";
import Search from "../Search/Search";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";


export default function Header() {
  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce(
    (sum: number, item: { count: number }) => sum + item.count,
    0
  );
  const location = useLocation();

 

  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.header__img} src="/Logo.svg" alt="Logo.svg" />
        <div>
          <h1>PIZZA ULTRA</h1>
          <p>Самая вкусная пицца во вселенной</p>
        </div>
      </Link>
      {location.pathname != "/orders" && <Search></Search>}
      <div>
        {location.pathname != "/orders" && (
          <Link to="/orders">
            {" "}
            <button>
              {items.length === 0 ? (
                "Корзина"
              ) : (
                <div className={styles.shop}>
                  <span>{totalPrice} ₽</span>
                  &ensp;<span className={styles.shop__line}>|</span>&ensp;
                  <span>
                    <img src="/iconShop.svg" alt="iconShop.svg" />
                    &ensp;
                    {totalCount}
                  </span>
                </div>
              )}
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
