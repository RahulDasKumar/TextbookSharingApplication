import { io } from "socket.io-client";

const URL = "http://localhost:8081"


export const socket = io(URL);
// when additional features added, add {autoConnect:false} to the socket param