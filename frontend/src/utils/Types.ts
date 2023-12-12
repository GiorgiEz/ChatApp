export type UserType = {
    user_id: number,
    username: string,
    password: string
}

export type RoomType = {
    room_id: number,
    room_name: string,
    password?: string,
    user_id: number,
    timestamp: Date,
}

export type MessageType = {
    message_id: number,
    content: string,
    timestamp: Date,
    user_id: number,
    room_id: number,
}