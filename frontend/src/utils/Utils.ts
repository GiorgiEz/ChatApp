import {RoomType, UserType} from "./Types";
import {setLockedRoom} from "../redux/actions";
import {useDispatch} from "react-redux";

export enum CRUD {
    CREATE = "POST",
    READ = "GET",
    UPDATE = "PUT",
    DELETE = "DELETE"
}

export function getUsernameByMessageUserId(messageUserId: number, usersData: UserType[]){
    for(let user of usersData){
        if (user.user_id === messageUserId) return user.username
    }
    return "User not found"
}

export function getUserByUsername(username: string, users: UserType[]){
    return users.find(user => user.username.toLowerCase() === username.toLowerCase())
}

export function getRoomByRoomId(room_id: string, rooms: RoomType[]){
    return rooms.find(room => room.room_id === parseInt(room_id))
}

export function userNotFound(username: string, usersData: UserType[], callback: () => void){
    const storedUsername = localStorage.getItem(username);
    if (storedUsername !== username) callback()
    else if (username && usersData.length && !getUserByUsername(username, usersData)) callback()
}

export function roomNotFound(room_id: string, roomsData: RoomType[], callback: () => void){
    const room = getRoomByRoomId(room_id, roomsData)
    if (room_id && roomsData.length && !room) callback()
}

export function calculateTimeAgo(order_date): string {
    const now = Date.now();
    const postDate = new Date(order_date).getTime();
    const elapsed = now - postDate;

    // Convert milliseconds to minutes, hours, and days
    const minutes = Math.floor(elapsed / (1000 * 60))
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

    if (minutes === 1) return `${minutes} minute ago`
    else if (minutes < 60) return `${minutes} minutes ago`
    else if (hours === 1) return `${hours} hour ago`
    else if (hours < 24) return `${hours} hours ago`
    else if (days === 1) return `${days} day ago`
    else return `${days} days ago`
}
