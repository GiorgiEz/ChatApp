import {Icons} from "../../utils/Icons";
import {useNavigate} from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold text-blue-300">Error!</h1>
                <p className="text-2xl text-blue-300 mt-2">Data Not Found</p>
            </div>
            <button
                className="flex items-center p-2 rounded-lg bg-blue-300 text-white hover:bg-blue-400 mt-1 w-24"
                onClick={() => navigate(`/`)}
            >{Icons.leftArrow}Back
            </button>
        </div>
    );
}
