import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import styles from "@/styles/add.module.scss";
import ImageModal from "@/containers/productManagement/imageModal";

interface IUploadForm {
  width: number;
  height: number;
  initialImage: string;
  setImage: (x: File | null) => void;
}

const UploadFile = ({ width, height, setImage, initialImage }: IUploadForm) => {
  /**
   * UploadFile Component
   *
   */

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isImageClicked, setIsImageClicked] = useState<boolean>(false);

  useEffect(() => {
    setPreviewUrl(initialImage);
  }, [initialImage]);

  const resetImage = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setImage(null);
  };

  const handleImageUpload = (file: File) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width <= width && img.height <= height) {
        setSelectedImage(file);
        setPreviewUrl(img.src);
        setImage(file);
      } else {
        resetImage();
      }
    };
    img.onerror = resetImage;
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleDeleteImage = (e: any) => {
    e.stopPropagation();
    resetImage();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className={`flex flex-row  gap-4 `}>
      {/* Upload Component */}
      <div className="w-full md:w-1/2">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleUploadClick}
          className={` ${styles.uploadImageContainer}  hover:  `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: "none" }}
            id="upload-input"
            ref={fileInputRef}
          />
          <div className={` ${styles.uploadIconWrapper} `}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="upload-cloud-02">
                <path
                  id="Icon"
                  d="M6.66699 13.3333L10.0003 10M10.0003 10L13.3337 13.3333M10.0003 10V17.5M16.667 13.9524C17.6849 13.1117 18.3337 11.8399 18.3337 10.4167C18.3337 7.88536 16.2816 5.83333 13.7503 5.83333C13.5682 5.83333 13.3979 5.73833 13.3054 5.58145C12.2187 3.73736 10.2124 2.5 7.91699 2.5C4.46521 2.5 1.66699 5.29822 1.66699 8.75C1.66699 10.4718 2.3632 12.0309 3.48945 13.1613"
                  stroke="#344054"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
          <div className={` ${styles.uploadTexts} `}>
            <div className={` ${styles.clickUpload} `}>
              <span className={"text-brand-secondary"}>Click to upload</span>
              <span className={"text-14_faux text-tertiary"}>
                or drag and drop
              </span>
            </div>
            <span className={"text-12_18 text-tertiary"}>
              SVG, PNG, JPG or GIF (max. 800x400px)
            </span>
          </div>
        </div>
      </div>
      {/* Upload File */}
      <div className="w-full md:w-1/2 ">
        {isImageClicked && (
          <ImageModal
            setIsImageClicked={setIsImageClicked}
            image={previewUrl}
          />
        )}
        {isImageClicked && (
          <ImageModal
            setIsImageClicked={setIsImageClicked}
            image={previewUrl}
          />
        )}

        {selectedImage && (
          <div
            onClick={() => setIsImageClicked(true)}
            className={styles.uploadedContainer}
          >
            <div className={styles.imageWrapper}>
              <img
                className={styles.uploadImage}
                src={previewUrl}
                alt="uploaded"
              />
            </div>
            <div
              className={styles.deleteImgIconWrapper}
              onClick={handleDeleteImage}
            >
              <svg
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
                    stroke="#182230"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>
        )}
        {previewUrl && !selectedImage && (
          <div
            onClick={() => setIsImageClicked(true)}
            className={styles.uploadedContainer}
          >
            <div className={styles.imageWrapper}>
              <img
                className={styles.uploadImage}
                src={previewUrl}
                alt="uploaded"
              />
            </div>
            <div
              className={styles.deleteImgIconWrapper}
              onClick={handleDeleteImage}
            >
              <svg
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
                    stroke="#182230"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
