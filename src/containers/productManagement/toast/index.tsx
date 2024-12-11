"use client";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "@/styles/toast.module.scss";
import {RootState} from "@/store/store";
import {hideToast} from "@/store/slices/toastSlice";

const Toast = () => {
    const dispatch = useDispatch();
    const {
        isOpen,
        title,
        message,
        type
    } = useSelector((state: RootState) => state.toast);

    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isOpen && !hovered) {
            timer = setTimeout(() => {
                dispatch(hideToast());
            }, 2000);
        } else if (hovered) {
            if (timer) {
                clearTimeout(timer);
            }
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isOpen, hovered, dispatch]);

    const isError = type === "error";
    const iconSrc = isError ? "/icons/product/alert.svg" : "/icons/product/toast.svg";

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`${styles.toasterContainer} ${isOpen ? styles.toastActive : ""}`}
        >
            <div className={isError ? styles.iconWrapperBigError : styles.iconWrapperBig}>
                <div className={isError ? styles.iconWrapperSmallError : styles.iconWrapperSmall}>
                    <img className={styles.icon} src={iconSrc} alt={isError ? "Error icon" : "Success icon"}/>
                </div>
            </div>
            <div className={styles.texts}>
                <span className="text-16_20 grey-light-700">{title}</span>
                <span className="text-14_faux text-tertiary">{message}</span>
            </div>
            <button onClick={() => dispatch(hideToast())} className={styles.closeIconWrapper} aria-label="Close toast">
                <svg
                    className={styles.closeIcon}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M18 6L6 18M6 6L18 18" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
};

export default Toast;
