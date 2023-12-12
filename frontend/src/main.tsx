import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {UserReducer} from "./redux/UserReducer";
import {RoomReducer} from "./redux/RoomReducer";

const rootReducer = combineReducers({
    user: UserReducer,
    room: RoomReducer,
})

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
)
