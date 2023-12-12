import {useNavigate, useParams} from "react-router-dom";
import React, {useRef, useState} from "react";
import {Icons} from "../../utils/Icons";
import useClickOutside from "../../hooks/useClickOutside";
import useCrud from "../../hooks/UseCrud";
import {ErrorMessage} from "../error/ErrorMessage";
import {getUserByUsername} from "../../utils/Utils";
import {useSelector} from "react-redux";

export function CreateRoomModal({setShowModal}){
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const { username } = useParams() as string;

    const users = useSelector(state => state.user.users);
    const rooms = useSelector(state => state.room.rooms);

    const user = getUserByUsername(username, users)

    const [roomName, setRoomName] = useState("");
    const [roomPassword, setRoomPassword] = useState("");
    const [incorrectRoomName, setIncorrectRoomName] = useState("");

    const { create, error } = useCrud('rooms');
    useClickOutside(modalRef, () => setShowModal(false));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomNameUpperCase = roomName.toUpperCase();
        const room = rooms.find((r) => r.room_name === roomNameUpperCase);

        if (room) setIncorrectRoomName('Room with this name already exists!');
        else {
            const response = await create({room_name: roomNameUpperCase, password: roomPassword, user_id: user.user_id,});
            if (response.success) {
                navigate(`/home/${username}/my_rooms`);
                setShowModal(false);
                setRoomName('');
                setRoomPassword('');
            }
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-md" ref={modalRef}>
                {error && <ErrorMessage errorMessage={error} callback={setShowModal}/>}
                <div className={"flex justify-between mt-2"}>
                    <h1 className="text-2xl font-semibold mb-4">Create Room</h1>
                    <button className={"mb-2"} onClick={() => setShowModal(false)}>{Icons.cancelButton}</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-96 p-3 border rounded"
                        type="text"
                        placeholder="Room Name"
                        value={roomName}
                        onChange={(e) => {
                            setRoomName(e.target.value)
                        }}
                    />
                    <p className="text-red-500 text-sm mb-2">{incorrectRoomName}</p>
                    <input
                        className="w-full p-3 border rounded"
                        type="password"
                        placeholder="Password (optional)"
                        value={roomPassword}
                        onChange={(e) => setRoomPassword(e.target.value)}
                    />
                    <button
                        className={`w-full p-3 font-bold ${
                            !roomName ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-300 hover:bg-blue-400'
                        } text-white rounded mt-4`}
                        disabled={!roomName}
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}