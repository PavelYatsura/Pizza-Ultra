import style from "./Search.module.sass";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function Search() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  return (
    <div className={style.search}>
      <svg
        className={style.search__icon}
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        viewBox="0 0 32 32"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={style.search__input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={style.search__close}
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 0 48 48"
          width="48"
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
}
