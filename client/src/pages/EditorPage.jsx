import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { FaCode } from "react-icons/fa6";
import { initSocket } from "../socket/socket";
import { ACTIONS } from "../actions.js";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const EditorPage = () => {
  const location = useLocation();
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [clients, setClients] = useState([]);

  const handleErrors = (err) => {
    console.log(err);
    toast.error("Socket connection failed, try again later!");
    // socketRef.current.close();
    navigate("/");
  };
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} has joined the room.`);
            console.log(`${username} has joined the room.`);
          }
          setClients(clients);
        }
      );
      // Listen for disconnection
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} has left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      })
    };
    init();
    return () => {
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.disconnect();
    }
  }, []);

  if (!location.state) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 bg-gray-800 text-white flex flex-col box-border border-r-2 border-r-blue-800">
        <div className="p-5">
          <div className="flex gap-2 mb-5 font-mono m-auto bg-blue-900 w-fit px-3 py-1 rounded-full">
            <FaCode fontSize={25} />
            <p>Live Code</p>
          </div>
          <h3 className="text-center text-lg mb-5">Connected</h3>
          <div className="flex gap-5 flex-wrap">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <div className="mt-auto p-5">
          <button className="w-full mb-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150">
            Copy ROOM ID
          </button>
          <button className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150">
            Leave
          </button>
        </div>
      </div>
      <div className="w-full">
        <Editor
          socketRef={2}
          roomId={2}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default EditorPage;
