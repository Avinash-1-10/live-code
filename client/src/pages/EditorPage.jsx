import React from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { FaCode } from "react-icons/fa6";

const EditorPage = () => {
  const clients = [
    { socketId: 1, username: "John" },
    { socketId: 2, username: "Avinash" },
  ];
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
    </div>
  );
};

export default EditorPage;
