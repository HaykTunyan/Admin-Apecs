import React, {useEffect, useState} from "react";
import styles from "@/styles/versions.module.scss";
import {IVersion} from "@/utils/types";
import Version from "@/containers/productManagement/list/productItems/versions/version";
import {Collapse} from "react-collapse";
import {generateUUID} from "@/hooks/generateUUID";

interface IVersions {
    onUpdate: (x: IVersion[]) => void;
    currentVersions: IVersion[];
}

const Versions = ({onUpdate, currentVersions}: IVersions) => {
    const initialVersion = {
        id: generateUUID(),
        version: `1.0`,
        barcode: "",
        priority: null,
        item_id: generateUUID(),
        // customerAvailability: '',
        comment: ""
    };
    const [versions, setVersions] = useState<IVersion[]>(currentVersions.length > 0 ? currentVersions : [initialVersion]);

    const handleAddVersion = () => {
        const highestVersionNumber = versions.reduce((max, version) => {
            const versionNum = parseFloat(version.version);
            return versionNum > max ? versionNum : max;
        }, 0);

        const newVersion: IVersion = {
            id: generateUUID(),
            version: `${(highestVersionNumber + 1).toFixed(1)}`,
            barcode: "",
            priority: null,
            // customerAvailability: '',
            comment: ""
        };

        setVersions(prevVersions => [...prevVersions, newVersion]);
        onUpdate([...versions, newVersion]);
    };

    const handleVersionChange = (id: string, field: keyof IVersion, value: string) => {
        setVersions(prevVersions =>
            prevVersions.map(version =>
                version.id === id ? {...version, [field]: value} : version
            )
        );
    };

    const handleDeleteVersion = (id: string) => {
        setVersions(prevVersions =>
            prevVersions.filter(version => version.id !== id)
        );
    };

    useEffect(() => {
        onUpdate(versions);
    }, [versions]);

    const fixedVersions = versions.filter(version => version.hasOwnProperty("item_id"));
    const remainingVersions = versions.filter(version => !fixedVersions.includes(version));

    return (
        <div className={styles.versionsWrapper}>
            <Version
                initial={true}
                version={versions[0]}
                onVersionChange={handleVersionChange}
                onDelete={() => {
                }}
            />
            {
                fixedVersions.length > 0 &&
                fixedVersions.slice(1).map(version => (
                    <Version
                        key={version.id}
                        initial={true}
                        version={version}
                        onVersionChange={handleVersionChange}
                        onDelete={handleDeleteVersion}
                    />
                ))
            }
            <Collapse isOpened={versions.length > 0}>
                {remainingVersions.map(version => (
                    <Version
                        key={version.id}
                        initial={false}
                        version={version}
                        onVersionChange={handleVersionChange}
                        onDelete={handleDeleteVersion}
                    />
                ))}
            </Collapse>
            <button className="btnAdd" onClick={handleAddVersion}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="plus">
                        <path
                            id="Icon"
                            d="M9.99996 4.16699V15.8337M4.16663 10.0003H15.8333"
                            stroke="#475467"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
                <span>Add a new version</span>
            </button>
        </div>
    );
};

export default Versions;
