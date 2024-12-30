import {RoomType} from "../../utils/Types";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";
import {RoomsList} from "./RoomsList";
import {userNotFound} from "../../utils/Utils";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOverlay} from "../../LoadingScreen/LoadingOverlay";
import {SearchRooms} from "./SearchRooms";
import {setRooms} from "../../redux/actions";
import {ErrorMessage} from "../error/ErrorMessage";
import {BackButton} from "../buttons/BackButton";

export function MyRooms(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { username } = useParams();

    const users = useSelector((state: any) => state.user.users)
    const rooms = useSelector((state: any) => state.room.rooms)

    const {data: userData, loading: userLoading, error} = useFetch(`http://127.0.0.1:8000/api/users/${username}`)
    const user: any = userData[0]

    const [usersRooms, setUsersRooms] = useState<RoomType[]>([])
    const [usersRoomsLoading, setUsersRoomsLoading] = useState(false)
    const [usersRoomsError, setUsersRoomsError] = useState(null)

    useEffect(() => {
        userNotFound(username as string, users, () => navigate("/not-found"))
        if (!user) return
        setUsersRoomsLoading(true)
        fetch(`http://localhost:3000/rooms/${user.user_id}`)
            .then(response => response.json())
            .then(response => {
                dispatch(setRooms(response))
                setUsersRooms(response)
            })
            .catch((e) => setUsersRoomsError(e))
            .finally(() => setUsersRoomsLoading(false))
    }, [user, username, users])

    return (
        <div className={"bg-gray-100 h-screen p-6"}>
            {error && <ErrorMessage errorMessage={error}/>}
            {usersRoomsError && <ErrorMessage errorMessage={usersRoomsError}/>}
            <LoadingOverlay isLoading={userLoading || usersRoomsLoading}/>
            <BackButton data={"MY ROOMS"}/>
            <SearchRooms roomsData={usersRooms}/>
            <RoomsList rooms={rooms} isMyRooms={true}/>
        </div>
    )
}
