import React, {useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import ClickableWithTooltip from "../../hooks/ClickableWithTooltip";
import useCrud from "../../hooks/UseCrud";
import {ErrorMessage} from "../error/ErrorMessage";
import {getUserByUsername} from "../../utils/Utils";
import {useSelector} from "react-redux";

export function DeleteUserModal(){
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const { username } = useParams() as string

    const usersData = useSelector(state => state.user.users)
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)

    const user = getUserByUsername(username, usersData)

    useClickOutside(modalRef, () => setShowDeleteUserModal(false));
    const { remove, error } = useCrud(`users/${user?.user_id ?? -1}`);

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        const response = await remove();
        if (response.success && !error) navigate("/")
    }

    return (
        <div>
            <ClickableWithTooltip value={username} callback={setShowDeleteUserModal} text={"Delete"}/>
            {showDeleteUserModal &&
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
                >
                    <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-md">
                        <form onSubmit={handleDeleteUser}>
                            <h1 className="text-2xl font-semibold">Are you sure you want to delete?</h1>
                            <div className="flex justify-center mt-4">
                                <button className="bg-red-300 hover:bg-red-500 text-white text-xl font-semibold  px-8 py-4 rounded-lg mr-4">
                                    Delete
                                </button>
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-8 py-4 rounded-lg text-xl"
                                    onClick={() => setShowDeleteUserModal(false)}>
                                    Cancel
                                </button>
                            </div>
                            {error && <ErrorMessage errorMessage={error} callback={setShowDeleteUserModal}/>}
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}
