import style from "./Categories.module.sass";
import { useSelector } from "react-redux";
import { setSort } from "../../redux/slices/filterSlice";
import { useAppDispatch } from "../../redux/store";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";
import { memo } from "react";

export interface ListInfo {
  name: string;
  sortProperty: string;
}

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = memo(
  ({ value, onClickCategory }) => {
    const dispatch = useAppDispatch();

    const sort: ListInfo = useSelector(
      (state: { filter: { sort: ListInfo } }) => state.filter.sort
    );

    const categories = ["Все", "Мясные", "Вегетарианская"];
    
    const list: ListInfo[] = [
      { name: "Имени", sortProperty: "name" },
      { name: "Хит", sortProperty: "rating" },
      { name: "Новые", sortProperty: "-rating" },
      { name: "Дешевые", sortProperty: "price" },
      { name: "Дорогие", sortProperty: "-price" },
    ];

    const onChangeSort = (obj: ListInfo) => {
      dispatch(setSort(obj));
    };

    useWhyDidYouUpdate("Categories", { value, onClickCategory });

    return (
      <nav className={style.nav}>
        <ul className={style.ul}>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={value === index ? style.active : style.li}
            >
              {categoryName}
            </li>
          ))}
        </ul>
        <div className={style.dropdown}>
          <button className={style.dropbtn}>
            <p>
              Сортировка по: <span>{sort.name}</span>
            </p>
          </button>
          <div className={style.dropdown_content}>
            {list.map((obj, index) => (
              <a
                onClick={() => onChangeSort(obj)}
                className={
                  sort.sortProperty === obj.sortProperty
                    ? style.dropdown_content__a_active
                    : style.dropdown_content__a
                }
                key={index}
                href="#"
              >
                {obj.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    );
  }
);

export default Categories;
