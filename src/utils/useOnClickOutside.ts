import { useEffect, RefObject } from "react";

const useOnClickOutside = (
    ref: RefObject<HTMLElement>,
    handler: any,
    excludeRef?: RefObject<HTMLElement> | null
) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (
                !ref.current ||
                ref.current.contains(event.target as Node) ||
                (excludeRef && excludeRef.current && excludeRef.current.contains(event.target as Node))
            ) {
                return;
            }
            handler();
        };

        document.addEventListener("mousedown", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, excludeRef, handler]);
};

export default useOnClickOutside;
