import style from "./Home.module.sass";
import { useCallback, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Skeleton from "../../components/Skeleton/Skeleton";
import Categories from "../../components/Categories/Categories";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { setCategoruId, setPageCount } from "../../redux/slices/filterSlice";
import { fetchPizzas } from "../../redux/slices/pizzasSlise";
import { PizzasInterface } from "../../interface/PizzasInterface";
import { useAppDispatch } from "../../redux/store";

interface IState {
  filter: {
    searchValue: string;
    categoryId: number;
    pageCount: number;
    sort: {
      name: string;
      sortProperty: string;
    };
  };
}
export default function Home() {
  const dispatch = useAppDispatch();
  const { categoryId, sort, pageCount, searchValue } = useSelector(
    (state: IState) => state.filter
  );
  const { items, status, allPages } = useSelector(
    (state: { pizzas: { status: string; items: []; allPages: number } }) =>
      state.pizzas
  );
  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoruId(id));
  }, [dispatch]);
  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));
  };
  const getData = async () => {};

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty;
    const search = searchValue ? `&name=${searchValue}*` : "";
    dispatch(fetchPizzas({ category, sortBy, search, pageCount }));
    getData();
  }, [categoryId, dispatch, pageCount, searchValue, sort.sortProperty]);

  const pizzas = items.map((i: PizzasInterface) => (
    <ProductCard key={i.id} {...i}></ProductCard>
  ));

  return (
    <>
      <Categories
        value={categoryId}
        onClickCategory={onClickCategory}
      ></Categories>
      <h2 className={style.mainTitle}>Все пиццы</h2>
      <div className={style.wrapper}>
        {status === "error" ? (
          <div>
            <h2>Произошла ошибка</h2>
            <p>Не удалось получить пиццы, попробкйте повтроить попытку позже</p>
          </div>
        ) : (
          <>
            {" "}
            {status === "loading"
              ? [...new Array(4)].map((_, index) => (
                  <Skeleton key={index}></Skeleton>
                ))
              : pizzas}
          </>
        )}
      </div>
      <Pagination allPages={allPages} onChangePage={onChangePage}></Pagination>
    </>
  );
}
