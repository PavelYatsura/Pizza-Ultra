import { useDispatch } from "react-redux";
import style from "./CartItem.module.sass";
import { deletedItem, plusItem, minusItem } from "../../redux/slices/cartSlice";

export type CartItemsProps = {
  index: number;
  id: number;
  name: string;
  price: number;
  count: number;
  src: string;
  type: string;
  size: number;
};



const CartItem: React.FC<CartItemsProps> = ({
  index,
  id,
  name,
  price,
  count,
  src,
  type,
  size,
}) => {
  const item: CartItemsProps = {
    index: index,
    id: id,
    name: name,
    price: price,
    src: src,
    type: type,
    size: size,
    count: count,
  };
  const dispatch = useDispatch();
  const onClickPlus = () => {
    
    dispatch(plusItem(item));
  };
  const onClickDeleted = () => {
    dispatch(deletedItem(index));
  };
  const onClickMinus = () => {
    dispatch(minusItem(item));
  };

  return (
    <div className={style.item}>
      <>
        <img src={src} alt={src} />
        <div className={style.item__discritpion}>
          <h3>{name}</h3>
          <p>
            {type}, <span>{size} cм.</span>
          </p>
        </div>
      </>
      <div className={style.item__cange}>
        <button
          disabled={count === 1}
          className={count === 1 ? style.item__btn_disabled : style.item__btn}
          onClick={onClickMinus}
        >
          -
        </button>
        <span>{count}</span>
        <button className={style.item__btn} onClick={onClickPlus}>
          +
        </button>
      </div>
      <p className={style.item__price}>{price * count} &#8381;</p>
      <button className={style.item__deleted} onClick={onClickDeleted}>
        +
      </button>
    </div>
  );
};
export default CartItem;
