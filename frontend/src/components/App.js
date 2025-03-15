import React, { useState } from "react";
import Chat from "./Chat"; // Import Chat component
import "./App.css"; // Import styles

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      setJoined(true);
    }
  };

  return (
    <div className="app-container">
      {!joined ? (
        <div className="join-container">
          <h2>Join a Project Chat Room</h2>
          <form onSubmit={handleJoin}>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            />
            <button type="submit">Join Chat</button>
          </form>
        </div>
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
};

export default A
