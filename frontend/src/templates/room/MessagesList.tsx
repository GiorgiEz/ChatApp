import {MessageType} from "../../utils/Types";
import {calculateTimeAgo, getUsernameByMessageUserId} from "../../utils/Utils";
import ClickableWithTooltip from "../../hooks/ClickableWithTooltip";
import {Icons} from "../../utils/Icons";
import {useState} from "react";
import {useSelector} from "react-redux";

export function MessagesList({allMessages, user} : {allMessages: MessageType[], user: any}) {
    const usersData = useSelector((state: any) => state.user.users)

    const [messagesLoadedCount, setMessagesLoadedCount] = useState(10)

    return (
        <div className="flex-1 overflow-y-auto p-4">
            {allMessages.length === 0 && (
                <h1 className="flex justify-center items-center h-32 text-3xl text-gray-500">No Messages</h1>
            )}
            {allMessages.map((message: MessageType, index) => (
                <div key={message.message_id ?? index} className="mb-4">
                    { index < messagesLoadedCount ?
                        <div>
                            {user &&
                                <span className={`text-lg font-semibold ${message.user_id === user.user_id ? '' : 'text-red-300'}`}>
                                    {message.user_id === user.user_id ? "You" : getUsernameByMessageUserId(message.user_id, usersData)}
                                </span>
                            }
                            <div className="bg-white rounded-lg p-4 shadow">{message.content}</div>
                            <div className="text-gray-500 text-xs mt-2">{calculateTimeAgo({order_date: message.timestamp})}</div>
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
    )
}