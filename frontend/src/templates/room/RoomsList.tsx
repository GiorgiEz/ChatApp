import {RoomType} from "../../utils/Types";
import {RoomIsLockedModal} from "../modals/RoomIsLockedModal";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Icons} from "../../utils/Icons";
import ClickableWithTooltip from "../../hooks/ClickableWithTooltip";
import {DeleteRoomModal} from "../modals/DeleteRoomModal";
import {calculateTimeAgo} from "../../utils/Utils";
import {EditRoomModal} from "../modals/EditRoomModal";
import {setLockedRoom} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

export function RoomsList({rooms, isMyRooms} : {rooms: any, isMyRooms?: boolean}) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { username } = useParams();

    const lockedRoom = useSelector((state : any) => state.room.lockedRoom)

    const [deletedRoom, setDeletedRoom] = useState<RoomType | false>(false);
    const [editedRoom, setEditedRoom] = useState<RoomType | false>(false);
    const [roomsLoadedCount, setRoomsLoadedCount] = useState(10);

    function joinRoom(room: RoomType){
        if (room.password) {
            dispatch(setLockedRoom(room))
        }
        else navigate(`/home/${username}/room/${room.room_id}`)
    }

    return (
        <div className="mt-4">
            {lockedRoom && <RoomIsLockedModal room={lockedRoom}/>}
            {deletedRoom && <DeleteRoomModal room={deletedRoom} setDeletedRoom={setDeletedRoom}/>}
            {editedRoom && <EditRoomModal room={editedRoom} setEditedRoom={setEditedRoom}/>}
            {rooms.map((room: RoomType, index: any) => (
                <div key={room.room_id}>
                    { index < roomsLoadedCount ?
                    <div className="bg-blue-300 p-2 rounded mt-2 hover:bg-blue-400 transition duration-200 ease-in-out">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-white">{room.room_name.toUpperCase()}</p>
                                <div className="text-gray-700 text-xs mt-2 hover:text-white text-bold">
                                    created {calculateTimeAgo({order_date: room.timestamp})}
                                </div>
                            </div>

                            <div className={"flex"}>
                                {isMyRooms &&
                                    <div>
                                        <button
                                            className="bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mr-2"
                                            onClick={() => setDeletedRoom(room)}
                                            > DELETE
                                        </button>
                                        <button
                                            className="bg-purple-700 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded mr-2"
                                            onClick={() => setEditedRoom(room)}
                                            > EDIT
                                        </button>
                                    </div>
                                }
                                <button
                                    className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
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