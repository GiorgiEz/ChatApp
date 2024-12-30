import {useRef} from "react";
import useClickOutside from "../../hooks/useClickOutside";
import useCrud from "../../hooks/UseCrud";
import {ErrorMessage} from "../error/ErrorMessage";
import {useDispatch, useSelector} from "react-redux";
import {setRooms} from "../../redux/actions";
import {CancelButton} from "../buttons/CancelButton";
import {DeleteButton} from "../buttons/DeleteButton";

export function DeleteRoomModal({room, setDeletedRoom} : {room: any, setDeletedRoom: any}) {
    const modalRef = useRef(null);
    const dispatch = useDispatch()

    const rooms = useSelector((state : any) => state.room.rooms)

    useClickOutside(modalRef, () => setDeletedRoom(false));
    const { remove, error } = useCrud(`rooms/${room.room_id}`);

    const handleDeleteRoom = async (e : any) => {
        e.preventDefault();
        const response = await remove()
        if (response.success) {
            dispatch(setRooms([...rooms.filter((rm : any) => rm.room_id !== room.room_id)]))
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
                        <DeleteButton/>
                        <CancelButton onClickHandler={() => setDeletedRoom(null)}/>
                    </div>
                </form>
            </div>
        </div>
    )
}