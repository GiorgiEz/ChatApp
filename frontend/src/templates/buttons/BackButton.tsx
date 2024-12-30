import {Icons} from "../../utils/Icons";
import {useNavigate, useParams} from "react-router-dom";

export function BackButton({data} : {data:any}){
    const navigate = useNavigate()
    const { username } = useParams();

    return (
        <>
            <button
                className="w-full flex items-center justify-between rounded-lg text-blue-300 bg-blue-300 text-gray hover:bg-blue-500"
                onClick={() => navigate(`/home/${username}`)}
            >
                <p className={"text-gray "}>{Icons.leftArrow}</p>
                <p className={"text-4xl text-white font-bold mt-2 mb-2"}>{data}</p>
                <p className={"text-blue-500"}>{Icons.leftArrow}</p>
            </button>
            <hr className="h-px my-4 bg-blue-900 border-0 dark:bg-gray-700"/>
        </>
    )
}