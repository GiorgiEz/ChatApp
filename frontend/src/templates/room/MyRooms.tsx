import {RoomType} from "../../utils/Types";
import React, {useEffect, useState} from "react";
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
    const { username } = useParams() as string;

    const users = useSelector(state => state.user.users)
    const rooms = useSelector(state => state.room.rooms)

    const {data: userData, loading: userLoading, error} = useFetch(`http://localhost:3000/users/${username}`)
    const user = userData[0]

    const [usersRooms, setUsersRooms] = useState<RoomType[]>([])
    const [usersRoomsLoading, setUsersRoomsLoading] = useState(false)
    const [usersRoomsError, setUsersRoomsError] = useState(null)

    useEffect(() => {
        userNotFound(username, users, () => navigate("/not-found"))
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
            {error && <ErrorMessage errorMessage={error.message}/>}
            {usersRoomsError && <ErrorMessage errorMessage={usersRoomsError.message}/>}
            <LoadingOverlay isLoading={userLoading || usersRoomsLoading}/>
            <BackButton data={"MY ROOMS"}/>
            <SearchRooms roomsData={usersRooms}/>
            <RoomsList rooms={rooms} isMyRooms={true}/>
        </div>
    )
}
