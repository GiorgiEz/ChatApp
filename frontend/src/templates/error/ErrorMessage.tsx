import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export function ErrorMessage({errorMessage, callback}) {
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(3000);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 10)
            if (timeLeft <= 0) return
        }, 10);
        if (timeLeft === 0 && callback) callback(false)

        return () => clearInterval(timer);
    }, [dispatch, timeLeft])

    return (
        <>
            {timeLeft > 0 && (
                <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
            )}

            {timeLeft > 0 && (
            <div className="relative w-full z-50">
                <div className="bg-red-500 text-white p-2 rounded-md shadow-md font-bold relative mt-2">
                    <div className="text-white 100">
                        Error: {errorMessage}
                        <div className="absolute bottom-0 left-0 h-1 bg-orange-100" style={{ width: `${(timeLeft / 3000) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}
