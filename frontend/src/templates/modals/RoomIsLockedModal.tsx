import {useNavigate, useParams} from "react-router-dom";
import {useRef, useState} from "react";
import {Icons} from "../../utils/Icons";
import useClickOutside from "../../hooks/useClickOutside";
import {useDispatch} from "react-redux";
import {setLockedRoom} from "../../redux/actions";

export function RoomIsLockedModal({room}){
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { username } = useParams() as string

    const [enteredPassword, setEnteredPassword] = useState<string | null>("")

    useClickOutside(modalRef, () => dispatch(setLockedRoom(false)));

    function handleSubmit(e){
        e.preventDefault()
        if (room.password === enteredPassword) {
            navigate(`/home/${username}/room/${room.room_id}`)
            dispatch(setLockedRoom(false))
        }
        else setEnteredPassword(null)
    }

    return (
        <div
            id="roomModal"
            className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
        >
            <div className="bg-white p-8 rounded-lg shadow-md" ref={modalRef}>
                <div className={"flex justify-between"}>
                    <h1 className="text-2xl font-semibold mb-4">Room is locked</h1>
                    <button className={"mb-2"} onClick={() => dispatch(setLockedRoom(false))}>{Icons.cancelButton}</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-64 p-3 border rounded"
                        type="password"
                        placeholder="Enter Password"
                        onChange={(e) => setEnteredPassword(e.target.value)}
                    />
                    <p className="text-red-500 text-sm mb-2">{enteredPassword === null ? "Incorrect Password" : ""}</p>
                    <button
                        className={`w-full p-3 font-bold ${
                            !enteredPassword? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-300 hover:bg-blue-400'
                        } text-white rounded mt-4`}
                        type="submit"
                        disabled={!enteredPassword}
                    > Join
                    </button>
                </form>
            </div>
        </div>
    )
}