import {useFetch} from "../../hooks/useFetch";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CreateRoomModal} from "../modals/CreateRoomModal";
import {DeleteUserModal} from "../modals/DeleteUserModal";
import {useDispatch, useSelector} from "react-redux";
import {setRooms, setUsers} from "../../redux/actions";
import {userNotFound} from "../../utils/Utils";
import {RoomsList} from "../room/RoomsList";
import {LoadingOverlay} from "../../LoadingScreen/LoadingOverlay";
import {SearchRooms} from "../room/SearchRooms";
import {ErrorMessage} from "../error/ErrorMessage";
import {Icons} from "../../utils/Icons";
import ClickableWithTooltip from "../../hooks/ClickableWithTooltip";

export function Home(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username } = useParams();

    const rooms = useSelector((state: any) => state.room.rooms)

    const { data: usersData, loading: usersLoading, error: usersError } = useFetch('http://127.0.0.1:8000/api/users/');
    const { data: roomsData, loading: roomsLoading, error: roomsError } = useFetch("http://127.0.0.1:8000/api/rooms/");

    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

    useEffect(() => {
        if (usersData.length) {
            dispatch(setUsers(usersData));
        }
        if (roomsData.length) {
            dispatch(setRooms(roomsData));
        }
        userNotFound(username as string, usersData, () => navigate("/not-found"))
    }, [dispatch, roomsData, usersData, username])

    return (
        <div className="bg-gray-100 h-screen p-6">
            {usersError && <ErrorMessage errorMessage={usersError}/>}
            {roomsError && <ErrorMessage errorMessage={roomsError}/>}
            <LoadingOverlay isLoading={usersLoading || roomsLoading}/>
            <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex justify-between items-center">
                    <div className={"flex justify-center items-center mr-2"}>
                        <div className="border border-solid border mr-2">
                            <ClickableWithTooltip value={Icons.leftArrow} text={"Sign Out"} callback={() => navigate("/")}/>
                        </div>
                        <DeleteUserModal/>
                    </div>
                    <div>
                        <button
                            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => navigate(`/home/${username}/my_rooms`)}
                        > My Rooms
                        </button>
                        <button
                            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-1"
                            onClick={() => setShowCreateRoomModal(true)}
                        > Create Room
                        </button>
                    </div>
                    {showCreateRoomModal && <CreateRoomModal setShowModal={setShowCreateRoomModal}/>}
                </div>
                <hr className="h-px my-4 bg-blue-900 border-0 dark:bg-gray-700"/>
                <SearchRooms roomsData={roomsData}/>
                <RoomsList rooms={rooms} isMyRooms={false}/>
            </div>
        </div>
    )
}
