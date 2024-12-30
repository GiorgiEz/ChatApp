import {useFetch} from "../../hooks/useFetch";
import {MessageType} from "../../utils/Types";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {roomNotFound, userNotFound} from "../../utils/Utils";
import {useSelector} from "react-redux";
import { io } from 'socket.io-client';
import {LoadingOverlay} from "../../LoadingScreen/LoadingOverlay";
import useCrud from "../../hooks/UseCrud";
import {ErrorMessage} from "../error/ErrorMessage";
import {BackButton} from "../buttons/BackButton";
import {MessagesList} from "./MessagesList";
import {RoomIsLockedModal} from "../modals/RoomIsLockedModal";

export function Room(){
    const navigate = useNavigate()
    const { room_id, username } = useParams()
    const usersData = useSelector((state: any) => state.user.users)
    const lockedRoom = useSelector((state: any) => state.room.lockedRoom)

    const {data: userData, loading: userLoading, error: usersError} = useFetch(`http://127.0.0.1:8000/api/users/${username}`)
    const user = userData[0]
    const {data: messagesData, loading: messagesLoading, error: messagesError} = useFetch(`http://127.0.0.1:8000/api/messages/${room_id}`)
    const {data: roomsData, loading: roomsLoading, error: roomsError} = useFetch("http://127.0.0.1:8000/api/rooms/");

    const [content, setContent] = useState("")
    const [allMessages, setAllMessages] = useState<MessageType[]>([]);

    const socket = io('ws://localhost:3000')
    const { create, error } = useCrud('messages');

    useEffect(() => {
        if (messagesData) setAllMessages([...messagesData])
        userNotFound(username as string, usersData, () => navigate("/not-found"))
        roomNotFound(room_id as string, roomsData, () => navigate(`/home/${username}`))
    }, [usersData, username, messagesData])

    useEffect(() => {
        socket.on('message', (data: MessageType) => {
            if (data.room_id === parseInt(room_id as string)) {
                setAllMessages([{...data, timestamp: Date.now()}, ...allMessages])
            }
        });
        return () => {socket.disconnect()}
    }, [allMessages]);

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const message = { content, user_id: (user as any)?.user_id, room_id: parseInt(room_id as string) }
        const response = await create(message)
        if (response.success) {
            socket.emit('message', {...message, timestamp: Date.now()})
            setContent('')
        }
    }

    const handleKeyDown = (e: any) => {
        if (content && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-6">
            {lockedRoom && <RoomIsLockedModal room={lockedRoom}/>}
            {error && <ErrorMessage errorMessage={error}/>}
            {usersError && <ErrorMessage errorMessage={usersError}/>}
            {roomsError && <ErrorMessage errorMessage={roomsError}/>}
            {messagesError && <ErrorMessage errorMessage={messagesError}/>}
            <LoadingOverlay isLoading={userLoading || messagesLoading || roomsLoading}/>
            <BackButton data={(roomsData.find((room : any) =>
                room.room_id === parseInt(room_id as string)) as any)?.room_name.toUpperCase()}/>
            <MessagesList allMessages={allMessages} user={user}/>
            <div className="p-4">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-l-lg"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        minLength={1}
                        required
                    />
                    <button
                        className={`px-4 py-2 bg-blue-400 text-white rounded-r-lg hover:bg-blue-500 ${
                            !content ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSubmit}
                        disabled={!content}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}
