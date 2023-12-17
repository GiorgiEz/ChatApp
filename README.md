# Chat App

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li>
        <a href="#architecture">Architecture</a>
        <ul>
            <li>
                <a href="#database">Database</a>
                <ul>
                    <li><a href="#entity-relationship-model">Entity-Relationship Model</a></li>
                </ul>
            </li>
            <li>
                <a href="#backend">Backend</a>
                <ul>
                    <li><a href="#api-endpoints">API Endpoints</a></li>
                </ul>
            </li>
            <li><a href="#frontend">Frontend</a></li>
        </ul>
    </li>
  </ol>
</details>

## Overview
The Chat App is a real-time communication platform designed to facilitate seamless and secure conversations between users. This app provides a dynamic space for users to engage in meaningful discussions.

## Features

- **User Authentication:** Allow users to sign up, log in, and securely authenticate their identity.
- **Real-Time Communication:** Utilize Socket.IO to enable real-time messaging between users in chat rooms.
- **Room Management:** Users can create, join, edit, and delete chat rooms, offering flexibility in organizing conversations.
- **Password Security:** Implement Bcrypt to secure user passwords with robust hashing algorithms.

## Technologies Used

- **Database:** XAMPP, MariaDB
- **Backend:** TypeScript, Express.js, Socket.IO, Bcrypt
- **Frontend:** Vite, React, Tailwind CSS, Redux

## Architecture
In this section, we'll delve into the architecture of the Chat App, breaking down its components into three main sections: Database, Backend, and Frontend. Understanding the underlying structure is essential for developers, contributors, and users alike.

### Database
The backbone of our Chat App's data management lies in the XAMPP environment, coupled with the power of MariaDB. This relational database system is structured to efficiently store user information, room details, and other essential data.

#### Entity-Relationship Model
To illustrate the relationships and structure of our database, I've created an Entity-Relationship (ER) model. This visual representation outlines the key entities, their attributes, and the relationships between them.
![ERModel.png](images%2FERModel.png)

* **User Table:** Represents users of the Chat App, storing essential user information such as user_id, username, and password. The username is set as a unique attribute, ensuring each user has a distinct identifier.
* **Room Table:** Captures details about the chat rooms within the application, including room_id, room_name, password(optional), timestamp and user_id. room_name is marked as unique attribute, user_id is a Foreign Key.
* **Message Table:** Stores individual messages exchanged within each chat room, with message_id, content, timestamp, user_id, and room_id as key attributes. The foreign key relationships with the User and Room tables establish connections between messages, users, and the rooms in which the messages are posted.

### Backend
Backend, developed in TypeScript and powered by Express.js, serves as the control center for the entire application. It manages real-time communication through Socket.IO, and orchestrates interactions with the database.

#### API Endpoints
**User Routes:**
Each endpoint starts with "/users".
- router.get('/'): Selects everything from the user table.
- router.get('/:identifier'): Endpoint to retrieve user information by username or user_id.
- router.post('/'): Endpoint to create a new user.
- router.delete('/:user_id'): Endpoint to delete user from the database.

**Room Routes:**
Each endpoint starts with "/rooms".
- router.get('/'): Selects everything from the room table.
- router.get('/:user_id'): Endpoint to filter rooms by user_id.
- router.post('/'): Endpoint to create a new room.
- router.delete('/:room_id'): Endpoint to delete a room by room_id.
- router.put('/:room_id'): Endpoint to edit a room.

**Message Routes:**
Each endpoint starts with "/messages".
- router.get('/'): Selects everything from the message table.
- router.get('/:room_id'): Selects messages by room_id.
- router.post('/'): Endpoint to send a message.

### Frontend
The frontend of Chat App is built using Vite, React, and Tailwind CSS. This combination provides a fast development environment, a dynamic user interface, and a sleek design.

- The Sign-In page welcomes users with options to either create a new username or sign in with an existing one.
![sign_in_page.png](images%2Fsign_in_page.png)
- After logging in, users are directed to the Home page. Here, they can explore various options, including searching for rooms, joining rooms, creating new rooms, logging out, or deleting their account.
![home_page.png](images%2Fhome_page.png)
- The My Rooms page provides users with a personalized view, displaying only the rooms they have created. Users can manage these rooms by deleting or editing them.
![my_rooms_page.png](images%2Fmy_rooms_page.png)
- The Room page showcases the user experience within a specific chat room, with features tailored for seamless communication.
![room_page.png](images%2Froom_page.png)
