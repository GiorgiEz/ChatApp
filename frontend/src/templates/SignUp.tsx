import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserByUsername} from "../utils/Utils";
import useCrud from "../hooks/UseCrud";
import {ErrorMessage} from "./error/ErrorMessage";

export function SignUp(){
    const navigate = useNavigate()
    const usersData = useSelector(state => state.user.users)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [incorrectPassword, setIncorrectPassword] = useState("")

    const { create, error } = useCrud('users');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = getUserByUsername(username, usersData)
        if (user) {
            if (user.password === password) {
                navigate(`/home/${username}`);
                setPassword('');
            } else {
                setIncorrectPassword("Incorrect password")
            }
        } else {
            const response = await create({ username, password });
            if (response.success) {
                navigate(`/home/${username}`);
                setPassword('');
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <header className="text-4xl font-bold mb-4">Chat App</header>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Sign Up or Sign In</h1>

                <form onSubmit={handleSubmit} className={"flex flex-col"}>
                    <input
                        className="w-96 p-3 border rounded mb-2"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength={1}
                        pattern=".*[a-zA-Z].*"
                        required
                    />
                    {incorrectPassword && <p className="text-blue-500 text-sm mb-2">Username already exists</p>}
                    {/^\d+$/.test(username) && <p className="text-red-500 text-sm mb-2">Username doesn't contain a letter</p>}
                    <input
                        className="w-96 p-3 border rounded mb-2"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        required
                    />
                    <p className="text-red-500 text-sm mb-2">{incorrectPassword}</p>

                    {/* Todo */}
                    {/*<button*/}
                    {/*    className="text-blue-200 underline hover:text-blue-500 cursor-pointer w-32"*/}
                    {/*    onClick={}*/}
                    {/*>Log in as Guest*/}
                    {/*</button>*/}

                    <button
                        className={`w-full p-3 font-bold ${
                            !username || !password ? 'bg-blue-100 cursor-not-allowed' : 'bg-blue-300 hover:bg-blue-400'
                        } text-white rounded mt-4`}
                        type="submit"
                        disabled={!username || !password}
                    >
                        Sign Up or Sign In
                    </button>
                    {error && <ErrorMessage errorMessage={error}/>}
                </form>
            </div>
        </div>
    )
}
