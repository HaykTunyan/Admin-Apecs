import React, {useEffect, useRef, useState} from "react";
import styles from "@/styles/add.module.scss";
import ImageModal from "@/containers/productManagement/imageModal";
import {ImageFile} from "@/utils/types";

interface IUploadForm {
    width: number;
    height: number;
    initialImages: ImageFile[];
    setImage: (images: File[] | []) => void;
    images: File[];
    onChange: (x: ImageFile[]) => void;
    onDelete: (x: string) => void;
}

const UploadImageMultiple = ({width, height, setImage, initialImages, images, onChange, onDelete}: IUploadForm) => {
    const [selectedImages, setSelectedImages] = useState<File[]>(images || []);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isImageClicked, setIsImageClicked] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<string>("");

    const resetImages = () => {
        setSelectedImages([]);
        setPreviewUrls([]);
        setImage([]);
    };

    const handleImageUpload = (file: File) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (img.width <= width && img.height <= height) {
                setSelectedImages(prevImages => [...prevImages, file]);
                setPreviewUrls(prevUrls => [...prevUrls, img.src]);
                setImage([...selectedImages, file]);
            }
        };
        img.onerror = resetImages;
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        files.forEach(file => handleImageUpload(file));
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
            fileInputRef.current.click();
        }
    };

    const handleDeleteImage = (index: number) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        const updatedPreviewUrls = previewUrls.filter((_, i) => i !== index);
        setSelectedImages(updatedImages);
        setPreviewUrls(updatedPreviewUrls);
        setImage(updatedImages);
    };

    const handleDeleteInitialImage = (index: number) => {
        const updatedInitialImages = initialImages.filter((_, i) => i !== index);
        const deletedImage = initialImages.filter((_, i) => i === index);

        onChange(updatedInitialImages);
        onDelete(deletedImage[0].id);
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) handleImageUpload(file);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const openImageModal = (url: string) => {
        setModalImage(url);
        setIsImageClicked(true);
    };

    useEffect(() => {
        if (isImageClicked) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
        } else {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        }
    }, [isImageClicked]);

    return (
        <div className={styles.rightUploadMultiple}>
            {isImageClicked && <ImageModal setIsImageClicked={setIsImageClicked} image={modalImage}/>}
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleUploadClick}
                className={styles.uploadImageContainer}
            >
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onFileChange}
                    style={{display: "none"}}
                    id="upload-input"
                    ref={fileInputRef}
                />
                <div className={styles.uploadIconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g id="upload-cloud-02">
                            <path id="Icon"
                                  d="M6.66699 13.3333L10.0003 10M10.0003 10L13.3337 13.3333M10.0003 10V17.5M16.667 13.9524C17.6849 13.1117 18.3337 11.8399 18.3337 10.4167C18.3337 7.88536 16.2816 5.83333 13.7503 5.83333C13.5682 5.83333 13.3979 5.73833 13.3054 5.58145C12.2187 3.73736 10.2124 2.5 7.91699 2.5C4.46521 2.5 1.66699 5.29822 1.66699 8.75C1.66699 10.4718 2.3632 12.0309 3.48945 13.1613"
                                  stroke="#344054" strokeWidth="1.66667" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </g>
                    </svg>
                </div>
                <div className={styles.uploadTexts}>
                    <div className={styles.clickUpload}>
                        <span className="text-brand-secondary">Click to upload</span>
                        <span className="text-14_faux text-tertiary">or drag and drop</span>
                    </div>
                    <span className="text-12_18 text-tertiary">PNG, JPG or MP4 (max. 800x400px)</span>
                </div>
            </div>
            <div className={styles.allImages}>
                {initialImages.length > 0 && (
                    <div className={styles.imagesWrapper}>
                        {initialImages.map((image, idx) => (
                            <div key={idx} className={styles.uploadedContainerMultiple}
                                 onClick={() => openImageModal(initialImages[idx].src)}>
                                <div className={styles.imageWrapper}>
                                    <img className={styles.uploadImage} src={image.src} alt={`Uploaded ${idx}`}/>
                                </div>
                                <div
                                    className={styles.deleteImgIconWrapper}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteInitialImage(idx);
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g id="trash-01">
                                            <path id="Icon"
                                                  d="M13.3333 5.00033V4.33366C13.3333 3.40024 13.3333 2.93353 13.1517 2.57701C12.9919 2.2634 12.7369 2.00844 12.4233 1.84865C12.0668 1.66699 11.6001 1.66699 10.6667 1.66699H9.33333C8.39991 1.66699 7.9332 1.66699 7.57668 1.84865C7.26308 2.00844 7.00811 2.2634 6.84832 2.57701C6.66667 2.93353 6.66667 3.40024 6.66667 4.33366V5.00033M8.33333 9.58366V13.7503M11.6667 9.58366V13.7503M2.5 5.00033H17.5M15.8333 5.00033V14.3337C15.8333 15.7338 15.8333 16.4339 15.5608 16.9686C15.3212 17.439 14.9387 17.8215 14.4683 18.0612C13.9335 18.3337 13.2335 18.3337 11.8333 18.3337H8.16667C6.76654 18.3337 6.06647 18.3337 5.53169 18.0612C5.06129 17.8215 4.67883 17.439 4.43915 16.9686C4.16667 16.4339 4.16667 15.7338 4.16667 14.3337V5.00033"
                                                  stroke="#182230" strokeWidth="1.66667" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {selectedImages.length > 0 && (
                    <div className={styles.imagesWrapper}>
                        {previewUrls.map((image, index) => (
                            <div key={index} onClick={() => openImageModal(previewUrls[index])}
                                 className={styles.uploadedContainerMultiple}>
                                <div className={styles.imageWrapper}>
                                    <img className={styles.uploadImage} src={image} alt="uploaded"/>
                                </div>
                                <div
                                    className={styles.deleteImgIconWrapper}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteImage(index);
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g id="trash-01">
                                            <path id="Icon"
                                                  d="M13.3333 5.00033V4.33366C13.3333 3.40024 13.3333 2.93353 13.1517 2.57701C12.9919 2.2634 12.7369 2.00844 12.4233 1.84865C12.0668 1.66699 11.6001 1.66699 10.6667 1.66699H9.33333C8.39991 1.66699 7.9332 1.66699 7.57668 1.84865C7.26308 2.00844 7.00811 2.2634 6.84832 2.57701C6.66667 2.93353 6.66667 3.40024 6.66667 4.33366V5.00033M8.33333 9.58366V13.7503M11.6667 9.58366V13.7503M2.5 5.00033H17.5M15.8333 5.00033V14.3337C15.8333 15.7338 15.8333 16.4339 15.5608 16.9686C15.3212 17.439 14.9387 17.8215 14.4683 18.0612C13.9335 18.3337 13.2335 18.3337 11.8333 18.3337H8.16667C6.76654 18.3337 6.06647 18.3337 5.53169 18.0612C5.06129 17.8215 4.67883 17.439 4.43915 16.9686C4.16667 16.4339 4.16667 15.7338 4.16667 14.3337V5.00033"
                                                  stroke="#182230" strokeWidth="1.66667" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadImageMultiple;
