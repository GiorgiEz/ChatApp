import React, {useRef} from "react";
import useClickOutside from "../../hooks/useClickOutside";
import useCrud from "../../hooks/UseCrud";
import {ErrorMessage} from "../error/ErrorMessage";
import {useDispatch, useSelector} from "react-redux";
import {setRooms} from "../../redux/actions";

export function DeleteRoomModal({room, setDeletedRoom}){
    const modalRef = useRef(null);
    const dispatch = useDispatch()

    const rooms = useSelector(state => state.room.rooms)

    useClickOutside(modalRef, () => setDeletedRoom(false));
    const { remove, error } = useCrud(`rooms/${room.room_id}`);

    const handleDeleteRoom = async (e) => {
        e.preventDefault();
        const response = await remove()
        if (response.success) {
            dispatch(setRooms([...rooms.filter(rm => rm.room_id !== room.room_id)]))
            setDeletedRoom(false)
        }
    }

    return (
        <div
            id="deleteRoomModal"
            className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
        >
            <div className="bg-white p-8 rounded-lg shadow-md" ref={modalRef}>
                {error && <ErrorMessage errorMessage={error} callback={setDeletedRoom}/>}
                <form onSubmit={handleDeleteRoom}>
                    <h1 className="text-2xl font-semibold">Are you sure you want to delete?</h1>
                    <div className="flex justify-center mt-4">
                        <button className="bg-red-300 hover:bg-red-500 text-white text-xl font-semibold  px-8 py-4 rounded-lg mr-4">
                            Delete
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-8 py-4 rounded-lg text-xl"
                            onClick={() => setDeletedRoom(null)}>
                                Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}