import React, {useState} from "react";
import styles from "@/styles/add.module.scss";

interface IKnob {
    name: string;
    isActive: boolean;
    setIsActive: (x: boolean) => void;
}

const Knob = ({name, isActive, setIsActive}: IKnob) => {
    const [isSwitched, setIsSwitched] = useState<boolean>(isActive);
    if(isSwitched){}

    const handleSwitch = () => {
        setIsSwitched(!isActive);
        setIsActive(!isActive);
    };

    return (
        <div
            className={styles.knobRow}
            onClick={handleSwitch}
        >
            <div
                className={`
            flex items-center p-0.5 cursor-pointer knobContainer
            ${isActive ? "primaryKnob" : ""}
            `}
            >
                <svg
                    className={`
                w-4 h-4 object-contain knob
                ${isActive ? "knobActive" : ""}
               `}
                    width="20" height="20" viewBox="0 0 21 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M10.1445 20C15.6674 20 20.1445 15.5228 20.1445 10C20.1445 4.47715 15.6674 0 10.1445 0C4.62168 0 0.144531 4.47715 0.144531 10C0.144531 15.5228 4.62168 20 10.1445 20Z"
                          fill={"#FFFFFF"}/>
                </svg>
            </div>
            <span className={"text-16_20 text-grey-light-700"}>{name}</span>
        </div>
    );
};

export default Knob;
