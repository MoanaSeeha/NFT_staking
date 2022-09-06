import {useCallback, useEffect} from "react";

const MOUSE_UP = 'mouseup';

function useOutsideClick(handleClose, ref) {
    const handleClick = useCallback((event) => {
        if (ref && !ref.current.contains(event.target)) {
            handleClose();
        }
    },[handleClose, ref]);

    useEffect(() => {
        document.addEventListener(MOUSE_UP, handleClick);

        return () => { document.removeEventListener(MOUSE_UP, handleClick); };
    }, [handleClick]);
    return { handleClose };
}

export default useOutsideClick;