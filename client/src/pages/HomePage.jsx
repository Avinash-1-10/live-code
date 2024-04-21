import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCode } from "react-icons/fa6";

const HomePage = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Room created successfully!");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both ROOM ID and username are required.");
      return;
    }
    navigate(`/editor/${roomId}`, { state: { username } });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="flex gap-2 mb-5 font-mono m-auto bg-blue-900 w-fit px-3 py-1 rounded-full">
            <FaCode fontSize={25} />
            <p>Live Code</p>
          </div>
          <div className="mb-6 text-center">
            <h4 className="text-xl font-semibold mt-3">
              Join or Create a Room
            </h4>
          </div>
          <div>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="ROOM ID"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              onKeyUp={handleInputEnter}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="USERNAME"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={handleInputEnter}
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              onClick={joinRoom}
            >
              Join Room
            </button>
            <button
              onClick={createNewRoom}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              New Room
            </button>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default HomePage;
