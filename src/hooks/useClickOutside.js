import { useEffect } from "react";

export const useClickOutside = (refOrRefs, callback) => {
    useEffect(() => {
        const handleClick = (event) => {
            const refs = Array.isArray(refOrRefs) ? refOrRefs : [refOrRefs];
            const isOutside = refs.every(
                (ref) => ref.current && !ref.current.contains(event.target)
            );
            if (isOutside) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [refOrRefs, callback]);
};