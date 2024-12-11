import React, {useState} from "react";
import ReactPaginate from "react-paginate";
import styles from "@/styles/categories.module.scss";
import {useRouter, useSearchParams} from "next/navigation";

interface ITablePagination {
    count: number;
}

const TablePagination = ({count}: ITablePagination) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1") - 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

    const handlePageClick = (event: { selected: number }) => {
        const newPage = event.selected + 1;
        setCurrentPage(event.selected);

        const params = new URLSearchParams(searchParams as unknown as URLSearchParams);
        params.set("page", newPage.toString());
        router.replace(`${window.location.pathname}?${params.toString()}`);
    };

    const offsetStep = 8;

    return (
        <div className={styles.paginationContainer}>
            <button
                className={"btnSec btnPage"}
                disabled={currentPage === 0}
                onClick={() => handlePageClick({selected: currentPage - 1})}
            >
                <svg
                    className={"btnIcon"}
                    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="arrow-left">
                        <path id="Icon"
                              d="M15.8337 10.0003H4.16699M4.16699 10.0003L10.0003 15.8337M4.16699 10.0003L10.0003 4.16699"
                              stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>
                <span>Previous</span>
            </button>
            <ReactPaginate
                forcePage={initialPage}
                activeClassName={styles.activePage}
                disabledLinkClassName={styles.disabledArrows}
                breakClassName={styles.li}
                pageClassName={styles.page}
                previousClassName={styles.arrow}
                nextClassName={styles.arrow}
                marginPagesDisplayed={1}
                className={styles.pagination}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={count / offsetStep}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
            <button
                className={"btnSec btnPage"}
                disabled={currentPage === Math.ceil(count / offsetStep) - 1}
                onClick={() => handlePageClick({selected: currentPage + 1})}
            >
                <span>Next</span>
                <svg
                    className={"btnIcon"}
                    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="arrow-right">
                        <path id="Icon"
                              d="M4.16699 10.0003H15.8337M15.8337 10.0003L10.0003 4.16699M15.8337 10.0003L10.0003 15.8337"
                              stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>
            </button>
        </div>
    );
};

export default TablePagination;
