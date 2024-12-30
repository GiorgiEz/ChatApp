import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Home} from "./templates/home/Home";
import {SignUp} from "./templates/signUp/SignUp";
import {Room} from "./templates/room/Room";
import {MyRooms} from "./templates/room/MyRooms";
import {NotFound} from "./templates/error/NotFound";
import {useFetch} from "./hooks/useFetch";
import {useEffect} from "react";
import {setUsers} from "./redux/actions";
import {useDispatch} from "react-redux";
import {LoadingOverlay} from "./LoadingScreen/LoadingOverlay";
import {ErrorMessage} from "./templates/error/ErrorMessage";

function App() {
    const dispatch = useDispatch()
    const { data: usersData, loading, error } = useFetch('http://127.0.0.1:8000/api/users/');

    useEffect(() => {
        if (usersData.length) {
            dispatch(setUsers(usersData));
        }
    }, [usersData, dispatch])

  return (
      <div>
          {error ? <ErrorMessage errorMessage={error}/> : ""}
          <LoadingOverlay isLoading={loading}/>
          <Router>
              <Routes>
                  <Route path={"/"} element={<SignUp />} />
                  <Route path={"/not-found"} element={<NotFound />} />
                  <Route path={"/home/:username"} element={<Home />} />
                  <Route path={"/home/:username/my_rooms"} element={<MyRooms />} />
                  <Route path={"/home/:username/room/:room_id"} element={<Room />} />
              </Routes>
          </Router>
      </div>
  )
}

export default App
