import React, {useState} from "react";
import styles from "@/styles/categories.module.scss";
import Link from "next/link";
import DeleteModal from "@/containers/productManagement/categories/deleteModal";

interface ITableRow {
    id: string;
    name: string;
    title: string;
    color: string;
    image: string;
    category: string;
    permision: any;
}

const SubTableRow = ({
                         id,
                         name,
                         title,
                         color,
                         image,
                         category,
                         permision,
                     }: ITableRow) => {

    const [isDeleteRequested, setIsDeleteRequested] = useState(false);

    const handleDeleteProduct = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDeleteRequested(true);
    };

    const enabledDeleteSubCategory =
        permision?.length && permision.includes("DELETE_CATEGORY");
    const enabledEditSubCategory =
        permision?.length && permision.includes("UPDATE_CATEGORY");

    return (
        <Link
            href={
                enabledEditSubCategory
                    ? `/product-management/settings/subcategories/${id}`
                    : ``
            }
            className={styles.subTableHeaders}
            style={{backgroundColor: color}}
        >
            {
                isDeleteRequested && <DeleteModal
                    id={id}
                    otherPage={false}
                    type={"subcategory"}
                    api={"sub-categories"}
                    name={name}
                    setIsDeleteRequested={setIsDeleteRequested}
                />
            }
            <div className={styles.tableBlock}>
                <div className={styles.withImage}>
                    {image && (
                        <img
                            className={styles.productImage}
                            src={image}
                            alt="product image"
                        />
                    )}
                    <span className={"text-16_20 text-default-primary"}>{name}</span>
                </div>
            </div>
            <div className={styles.tableBlock}>
                <span className={"text-14_faux text-tertiary"}>{title}</span>
            </div>
            <div className={styles.tableBlock}>
                {
                    category && <div className={"btnBadge"}>
                        <span>{category}</span>
                    </div>
                }
            </div>
            <div className={styles.tableBlockActions}>
                {enabledDeleteSubCategory && (
                    <div onClick={handleDeleteProduct} className={styles.iconContainer}>
                        <svg
                            className={styles.actionIcon}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="trash-01">
                                <path
                                    id="Icon"
                                    d="M13.3333 5.00033V4.33366C13.3333 3.40024 13.3333 2.93353 13.1517 2.57701C12.9919 2.2634 12.7369 2.00844 12.4233 1.84865C12.0668 1.66699 11.6001 1.66699 10.6667 1.66699H9.33333C8.39991 1.66699 7.9332 1.66699 7.57668 1.84865C7.26308 2.00844 7.00811 2.2634 6.84832 2.57701C6.66667 2.93353 6.66667 3.40024 6.66667 4.33366V5.00033M8.33333 9.58366V13.7503M11.6667 9.58366V13.7503M2.5 5.00033H17.5M15.8333 5.00033V14.3337C15.8333 15.7338 15.8333 16.4339 15.5608 16.9686C15.3212 17.439 14.9387 17.8215 14.4683 18.0612C13.9335 18.3337 13.2335 18.3337 11.8333 18.3337H8.16667C6.76654 18.3337 6.06647 18.3337 5.53169 18.0612C5.06129 17.8215 4.67883 17.439 4.43915 16.9686C4.16667 16.4339 4.16667 15.7338 4.16667 14.3337V5.00033"
                                    stroke="#475467"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    </div>
                )}
                {enabledEditSubCategory && (
                    <div className={styles.iconContainer}>
                        <svg
                            className={styles.actionIcon}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="edit-01">
                                <path
                                    id="Icon"
                                    d="M2.39662 15.0963C2.43491 14.7517 2.45405 14.5794 2.50618 14.4184C2.55243 14.2755 2.61778 14.1396 2.70045 14.0142C2.79363 13.8729 2.91621 13.7503 3.16136 13.5052L14.1666 2.49992C15.0871 1.57945 16.5795 1.57945 17.4999 2.49993C18.4204 3.4204 18.4204 4.91279 17.4999 5.83326L6.49469 16.8385C6.24954 17.0836 6.12696 17.2062 5.98566 17.2994C5.86029 17.3821 5.72433 17.4474 5.58146 17.4937C5.42042 17.5458 5.24813 17.5649 4.90356 17.6032L2.08325 17.9166L2.39662 15.0963Z"
                                    stroke="#475467"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default SubTableRow;
