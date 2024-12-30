import {setRooms} from "../../redux/actions";
import {useDispatch} from "react-redux";

export function SearchRooms({roomsData} : {roomsData: any}){
    const dispatch = useDispatch()

    function searchRooms(e:any){
        const value = e.target.value.toUpperCase();
        dispatch(setRooms([...roomsData.filter((room: any) => room.room_name.toUpperCase().includes(value))]))
    }

    return (
        <div>
            <input
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                type="text"
                placeholder="Search rooms..."
                disabled={roomsData.length <= 0}
                onChange={(e) => searchRooms(e)}
            />
        </div>
    )
}
