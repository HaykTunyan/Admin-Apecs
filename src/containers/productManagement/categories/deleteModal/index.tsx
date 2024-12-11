import React, {useRef, useState} from "react";
import styles from "@/styles/add.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {useRouter} from "next/navigation";
import {deleteByType} from "@/api/productManagement/deleteByType";
import {showToast} from "@/store/slices/toastSlice";
import {useDispatch} from "react-redux";

interface IDeleteModal {
    id: string;
    setIsDeleteRequested: (x: boolean) => void;
    type: string;
    api: string;
    name: string;
    otherPage: boolean;
}

const DeleteModal = ({id, setIsDeleteRequested, type, api, name, otherPage}: IDeleteModal) => {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch = useDispatch();

    const handleCancel = () => {
        setIsDeleteRequested(false);
    };

    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, setIsDeleteRequested);

    const handleDeleteCategory = () => {
        setIsProcessing(true);

        if (type === "subcategory") {
            deleteByType(api, id)
                .then(() => {
                    if (otherPage) {
                        router.push("/product-management/settings?filter=subcategories");
                    } else {
                        window.location.reload();
                    }
                })
                .catch(() => setIsProcessing(false));
        } else if (type === "attribute") {
            deleteByType(api, id)
                .then((res) => {
                    if (res.message === "Cannot delete attribute with products") {
                        setIsDeleteRequested(false);
                        dispatch(showToast({
                            title: "Failed to delete the attribute",
                            message: res.message,
                            type: "error"
                        }));
                        return;
                    }

                    if (otherPage) {
                        router.push("/product-management/settings?filter=attributes");
                    } else {
                        window.location.reload();
                    }
                })
                .catch(() => setIsProcessing(false));
        } else if (type === "mainProduct") {
            deleteByType(api, id)
                .then(() => {
                    if (otherPage) {
                        router.push("/product-management/list?itemType=mainProducts");
                    } else {
                        window.location.reload();
                    }
                })
                .catch(() => setIsProcessing(false));
        } else if (type === "productItem") {
            deleteByType(api, id)
                .then(() => {
                    if (otherPage) {
                        router.push("/product-management/list?itemType=productItems");
                    } else {
                        window.location.reload();
                    }
                })
                .catch(() => setIsProcessing(false));
        } else {
            deleteByType(api, id)
                .then((res) => {
                    if (res.message === "Cannot delete category with products") {
                        setIsDeleteRequested(false);
                        dispatch(showToast({
                            title: "Failed to delete the category",
                            message: res.message,
                            type: "error"
                        }));
                        return;
                    }
                    if (otherPage) {
                        router.push("/product-management/settings?filter=categories");
                    } else {
                        window.location.reload();
                    }
                })
                .catch(() => setIsProcessing(false));
        }
    };

    const handleCloseModal = () => {
        setIsDeleteRequested(false);
    };

    return (
        <div
            className={styles.modalWrapper}
            onClick={(e) => e.preventDefault()}
        >
            <div
                ref={modalRef}
                className={styles.modal}
            >
                <img
                    className={styles.squares}
                    src="/icons/product/deleteSquare.svg"
                    alt="squares"
                />
                <div
                    onClick={handleCloseModal}
                    className={styles.closeIconWrapper}
                >
                    <svg
                        className={styles.closeIcon}
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="x-close">
                            <path id="Icon" d="M18 6L6 18M6 6L18 18" stroke="#98A2B3" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </div>
                <div className={styles.deleteIconWrapper}>
                    <svg
                        className={styles.deleteIcon}
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="trash-01">
                            <path id="Icon"
                                  d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                  stroke="#D92D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </div>
                <div className={styles.texts}>
                    <span
                        className={"text-18_28_inter text-default-primary"}>Delete {type === "mainProduct" ? "product" : type} &apos;{name}&apos;</span>
                    <span className={"text-14_faux text-tertiary"}>
                        Are you sure you want to delete this product {type === "mainProduct" ? "" : type}? This action cannot be undone.
                    </span>
                </div>
                <div className={styles.btns}>
                    <button
                        onClick={handleCancel}
                        className={"btnSec"}
                    >
                        <span>Back</span>
                    </button>
                    <button
                        disabled={isProcessing}
                        onClick={handleDeleteCategory}
                        className={"btnDelete"}
                    >
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
