import React, {useRef} from "react";
import styles from "@/styles/add.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface IDeleteModal {
    setIsImageClicked: (x: boolean) => void;
    image: string;
}

const ImageModal = ({setIsImageClicked, image}: IDeleteModal) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, setIsImageClicked);

    return (
        <div
            className={styles.modalWrapper}
            onClick={(e) => e.preventDefault()}
        >
            <div
                ref={modalRef}
                className={styles.modalImage}
            >
                <div
                    onClick={() => setIsImageClicked(false)}
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
                <div className={styles.imageShowWrapper}>
                    <img
                        className={styles.imageShow}
                        src={image}
                        alt="squares"
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
