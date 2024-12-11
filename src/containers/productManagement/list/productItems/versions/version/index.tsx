import React from "react";
import styles from "@/styles/versions.module.scss";
import {IVersion} from "@/utils/types";

interface VersionProps {
    initial: boolean;
    version: IVersion;
    onVersionChange: (id: string, field: keyof IVersion, value: string) => void;
    onDelete: (id: string) => void;
}

const Version = ({initial, version, onVersionChange, onDelete}: VersionProps) => {
    const handleChange = (field: keyof IVersion) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onVersionChange(version.id, field, e.target.value);
    };

    return (
        <div className={styles.versionContainer}>
            <div className={styles.versionHeader}>
                <span className={"text-18_28_inter text-default-primary"}>
                    {`Version ${version.version}`}
                </span>
                {
                    !initial &&
                    <div
                        onClick={() => onDelete(version.id)}
                        className={styles.deleteVersion}
                    >
                        <span className={"text-16_20 font-medium text-tertiary"}>Delete</span>
                        <svg
                            className={styles.deleteIcon}
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
                }
            </div>
            <div className={styles.versionDetails}>
                <div className={styles.grid}>
                    <div className={"inputWithLabel"}>
                        <label htmlFor={"versionName"} className={"text-fg-disabled"}>Version name (*)</label>
                        <input
                            id={"versionName"}
                            value={version.version}
                            onChange={handleChange("version")}
                            type="text"
                            className={"input inputWithoutWidth"}
                            placeholder={"0.0"}
                        />
                    </div>
                    <div className={"inputWithLabel"}>
                        <label htmlFor={"code"} className={"text-fg-disabled"}>B code (*)</label>
                        <input
                            id={"code"}
                            value={version.barcode}
                            onChange={handleChange("barcode")}
                            type="text"
                            className={"input inputWithoutWidth"}
                            placeholder={"123456"}
                        />
                    </div>
                    <div className={"inputWithLabel"}>
                        <label htmlFor={"priority"} className={"text-fg-disabled"}>Priority (*)</label>
                        <input
                            id={"priority"}
                            value={version.priority ? version.priority.toString() : ""}
                            onChange={handleChange("priority")}
                            type="number"
                            className={"input inputWithoutWidth"}
                            placeholder={"Value 1"}
                        />
                    </div>
                    {/*<div className={"inputWithLabel"}>*/}
                    {/*    <label htmlFor={"availability"} className={"text-fg-disabled"}>Customer availability (*)</label>*/}
                    {/*    <input*/}
                    {/*        id={"availability"}*/}
                    {/*        value={version.customerAvailability}*/}
                    {/*        onChange={handleChange("customerAvailability")}*/}
                    {/*        type="text"*/}
                    {/*        className={"input inputWithoutWidth"}*/}
                    {/*        placeholder={"All"}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
                <div className={"inputWithLabel"}>
                    <label htmlFor={"comment"} className={"text-fg-disabled"}>Comment (optional)</label>
                    <textarea
                        id={"availability"}
                        value={version.comment}
                        onChange={handleChange("comment")}
                        rows={3}
                        className={"input inputWithoutWidth textAreaInput"}
                        placeholder={"What differs? Describe here..."}
                    />
                </div>
            </div>
        </div>
    );
};

export default Version;
