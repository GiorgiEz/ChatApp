import React, {useRef, useState} from "react";
import useClickOutside from "../../hooks/useClickOutside";
import useCrud from "../../hooks/UseCrud";
import {ErrorMessage} from "../error/ErrorMessage";
import {useDispatch, useSelector} from "react-redux";
import {setRooms} from "../../redux/actions";

export function EditRoomModal({room, setEditedRoom}){
    const modalRef = useRef(null);
    const dispatch = useDispatch()

    const rooms = useSelector(state => state.room.rooms)

    const [roomName, setRoomName] = useState<string>("")
    const [roomPassword, setRoomPassword] = useState<string>("")

    useClickOutside(modalRef, () => setEditedRoom(false));
    const { update, error } = useCrud(`rooms/${room.room_id}`);

    const handleEditRoom = async (e) => {
        e.preventDefault();
        const editedRoom = {room_name: roomName === "" ? room.room_name : roomName,
                            password: roomPassword === "" ? room.password : roomPassword}
        const response = await update(editedRoom)
        if (response.success) {
            dispatch(setRooms([...rooms.map(rm => rm.room_id === room.room_id ? {...rm, ...editedRoom} : rm)]))
            setEditedRoom(false)
        }
    }

    return (
        <div
            id="editRoomModal"
            className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
        >
            <div className="bg-white p-16 rounded-lg shadow-md" ref={modalRef}>
                {error && <ErrorMessage errorMessage={error} callback={setEditedRoom}/>}
                <p className={"flex items-center justify-center mb-10 text-4xl font-bold"}>{room.room_name}</p>
                <form onSubmit={handleEditRoom}>
                    <div className={"flex flex-col"}>
                        <input
                            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                            type="text"
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder={"New Room Name"}
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500 mt-2"
                            type="text"
                            onChange={(e) => setRoomPassword(e.target.value)}
                            placeholder={"New Room password"}
                        />
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                            className={`w-full font-bold ${
                                !roomName && !roomPassword ? 'bg-red-300 cursor-not-allowed opacity-30' : 'bg-red-300 hover:bg-red-400'
                            } text-white rounded mr-4 font-semibold px-8 py-4 rounded-lg text-xl`}
                            disabled={!roomName && !roomPassword}
                        >
                            Confirm
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-8 py-4 rounded-lg text-xl"
                            onClick={() => setEditedRoom(null)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}