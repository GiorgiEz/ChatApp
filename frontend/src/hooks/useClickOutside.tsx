import { useEffect } from 'react';

const useClickOutside = (ref:any, callback:any) => {
    useEffect(() => {
        const handleClickOutside = (e:any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, callback]);
}

export default useClickOutside;
