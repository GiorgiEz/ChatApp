import {RoomType} from "../../utils/Types";
import {RoomIsLockedModal} from "../modals/RoomIsLockedModal";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Icons} from "../../utils/Icons";
import ClickableWithTooltip from "../../hooks/ClickableWithTooltip";
import {DeleteRoomModal} from "../modals/DeleteRoomModal";
import {calculateTimeAgo} from "../../utils/Utils";
import {EditRoomModal} from "../modals/EditRoomModal";

export function RoomsList({rooms, isMyRooms}){
    const navigate = useNavigate();
    const { username } = useParams() as string;

    const [lockedRoom, setLockedRoom] = useState<RoomType | false>(false);
    const [deletedRoom, setDeletedRoom] = useState<RoomType | false>(false);
    const [editedRoom, setEditedRoom] = useState<RoomType | false>(false);
    const [roomsLoadedCount, setRoomsLoadedCount] = useState(10);

    function joinRoom(room: RoomType){
        if (room.password) setLockedRoom(room)
        else navigate(`/home/${username}/room/${room.room_id}`)
    }

    return (
        <div className="mt-4">
            {lockedRoom && <RoomIsLockedModal room={lockedRoom} setLockedRoom={setLockedRoom}/>}
            {deletedRoom && <DeleteRoomModal room={deletedRoom} setDeletedRoom={setDeletedRoom}/>}
            {editedRoom && <EditRoomModal room={editedRoom} setEditedRoom={setEditedRoom}/>}
            {rooms.map((room: RoomType, index) => (
                <div key={index}>
                    { index < roomsLoadedCount ?
                    <div key={room.room_id}
                         className="bg-blue-300 p-2 rounded mt-2 hover:bg-blue-400 transition duration-200 ease-in-out"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-white">{room.room_name}</p>
                                <div className="text-gray-700 text-xs mt-2 hover:text-white text-bold">
                                    created {calculateTimeAgo(room.timestamp)}
                                </div>
                            </div>

                            <div className={"flex"}>
                                {isMyRooms &&
                                    <div>
                                        <button
                                            className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            onClick={() => setDeletedRoom(room)}
                                            > DELETE
                                        </button>
                                        <button
                                            className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mr-2"
                                            onClick={() => setEditedRoom(room)}
                                            > EDIT
                                        </button>
                                    </div>
                                }
                                <button
                                    className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => joinRoom(room)}
                                > JOIN
                                </button>
                            </div>
                        </div>
                    </div>
                    : ""}
                </div>
            ))}
            {roomsLoadedCount < rooms.length ?
                <div className={"flex align-center justify-center mt-4"}>
                    <ClickableWithTooltip
                        callback={() => setRoomsLoadedCount(roomsLoadedCount + 10)}
                        text={"Load More"} value={Icons.downArrow}
                    />
                </div>
            : ""}
        </div>
    )
}