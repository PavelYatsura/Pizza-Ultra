import style from "./Pagination.module.sass";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  onChangePage: (event: number) => void;
  allPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage, allPages }) => {
  return (
    <ReactPaginate
      className={style.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={allPages}
    />
  );
};
export default Pagination;
