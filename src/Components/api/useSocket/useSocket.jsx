"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKETIP } from "../Contant";

let socket; // single socket instance

export default function useSocket(eventName) {
  const [socket_data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      socket = io(SOCKETIP, { transports: ["websocket"] });
    }

    socket.on("connect", () => {
      console.log("🟢 Connected:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected");
      setConnected(false);
    });

    if (eventName) {
      socket.on(eventName, (payload) => {
        console.log(`📩 Event received [${eventName}]:`, payload);
        setData(payload);
      });
    }

    return () => {
      if (eventName) {
        socket.off(eventName); // cleanup for this event only
      }
    };
  }, [eventName]);

  return { socket_data, connected };
}
