import {useFetch} from "../../hooks/useFetch";
import {MessageType} from "../../utils/Types";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {calculateTimeAgo, getUsernameByMessageUserId, userNotFound} from "../../utils/Utils";
import {Icons} from "../../utils/Icons";
import {useSelector} from "react-redux";
import ClickableWithTooltip from "../../hooks/ClickableWithTooltip";
import { io } from 'socket.io-client';
import {LoadingOverlay} from "../../LoadingScreen/LoadingOverlay";
import useCrud from "../../hooks/UseCrud";
import {ErrorMessage} from "../error/ErrorMessage";
import {BackButton} from "../buttons/BackButton";

export function Room(){
    const navigate = useNavigate()
    const { room_id, username } = useParams() as string
    const usersData = useSelector(state => state.user.users)

    const {data: userData, loading: userLoading, error: usersError} = useFetch(`http://localhost:3000/users/${username}`)
    const user = userData[0]
    const {data: messagesData, loading: messagesLoading, error: messagesError} = useFetch(`http://localhost:3000/messages/${room_id}`)
    const { data: roomsData, loading: roomsLoading, error: roomsError } = useFetch("http://localhost:3000/rooms");

    const [content, setContent] = useState("")
    const [messagesLoadedCount, setMessagesLoadedCount] = useState(10)
    const [allMessages, setAllMessages] = useState([]);

    const socket = io('ws://localhost:3000')
    const { create, error } = useCrud('messages');

    useEffect(() => {
        if (messagesData) setAllMessages([...messagesData])
        userNotFound(username, usersData, () => navigate("/UserNotFound"))
    }, [usersData, username, messagesData])

    useEffect(() => {
        socket.on('message', (data: MessageType) => {
            if (data.room_id === parseInt(room_id)) {
                setAllMessages([{...data, timestamp: Date.now()}, ...allMessages])
            }
        });
        return () => {socket.disconnect()}
    }, [allMessages]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = { content, user_id: user.user_id, room_id: parseInt(room_id) }
        const response = await create(message)
        if (response.success) {
            socket.emit('message', {...message, timestamp: Date.now()})
            setContent('')
        }
    }

    const handleKeyDown = (e) => {
        if (content && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-6">
            {error && <ErrorMessage errorMessage={error}/>}
            {usersError && <ErrorMessage errorMessage={usersError.message}/>}
            {roomsError && <ErrorMessage errorMessage={roomsError.message}/>}
            {messagesError && <ErrorMessage errorMessage={messagesError.message}/>}
            <LoadingOverlay isLoading={userLoading || messagesLoading || roomsLoading}/>
            <BackButton data={roomsData.find(room => room.room_id === parseInt(room_id))?.room_name.toUpperCase()}/>
            <div className="flex-1 overflow-y-auto p-4">
                {allMessages.length === 0 && (
                    <h1 className="flex justify-center items-center h-32 text-3xl text-gray-500">No Messages</h1>
                )}
                {allMessages.map((message: MessageType, index) => (
                    <div key={index} className="mb-4">
                        { index < messagesLoadedCount ?
                        <div>
                            {user &&
                                <span className={`text-lg font-semibold ${message.user_id === user.user_id ? '' : 'text-red-500'}`}>
                                    {message.user_id === user.user_id ? "You" : getUsernameByMessageUserId(message.user_id, usersData)}
                                </span>
                            }
                            <div className="bg-white rounded-lg p-4 shadow">{message.content}</div>
                            <div className="text-gray-500 text-xs mt-2">{calculateTimeAgo(message.timestamp)}</div>
                        </div>
                        : ""}
                    </div>
                ))}
                {messagesLoadedCount < allMessages.length ?
                    <div className={"flex align-center justify-center"}>
                        <ClickableWithTooltip
                            callback={() => setMessagesLoadedCount(messagesLoadedCount + 10)}
                            text={"Load More"} value={Icons.downArrow}
                        />
                    </div> : ""
                }
            </div>
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
