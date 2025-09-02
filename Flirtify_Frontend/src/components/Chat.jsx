import React, { useEffect, useState ,useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([{}]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const navigate=useNavigate();

  const messagesEndRef = useRef(null); // Reference for scrolling to the bottom

  const fetchChatMessages = async () => {
    try{
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
     
     
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text,createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          createdAt,
        };
      });
  
      setMessages(chatMessages);
    }
    catch(err){
      //if some error is coming like invalid targetiD or i chat with a person who is not my friend
         navigate('/');
    }
    
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    //socket  connection with backend server
    const socket = createSocketConnection();

    //  As soon as the page loads socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageRecived", ({ firstName, lastName, text, createdAt }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text , createdAt}]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

    // whenever messages are changed i am scroll to bottom
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      text: newMessage,
      userId,
      targetUserId,
    });
    setNewMessage("");
  }; 



  //format time in human readable
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageDate) / 1000);
    
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  //dynamically upadte the time
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prevMessages) => [...prevMessages]);
    }, 60000); // Update every minute
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-3/4 mx-auto border border-gray-600 rounded-xl shadow-lg m-5 h-[70vh] flex flex-col bg-gray-800">
      <h1 className="p-6 border-b border-gray-600 text-white font-semibold text-lg"> Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((message, idx) => {
          return (
          
            <div
  key={idx}
  className={`chat ${
    user?.firstName === message?.firstName ? "chat-end" : "chat-start"
  }`}
>
  <div className="chat-header flex justify-between text-sm text-gray-400">
    <span className="font-bold">{`${message?.firstName} ${message?.lastName}`}</span>
    <time className="text-xs opacity-75 ml-1 mt-1">{formatTimeAgo(message.createdAt)}</time>
  </div>
  <div className="chat-bubble text-white bg-blue-600 p-3 rounded-lg my-2 shadow-md max-w-[80%]">
    {message?.text}
  </div>
  <div className="chat-footer text-xs opacity-50">Seen</div>
</div>


          );
        })}
        {/* Scroll reference at the bottom */}
        <div ref={messagesEndRef} />
      </div>
     
      <div className="p-5 border-t border-gray-600 flex items-center gap-3 bg-gray-800 rounded-b-xl">
  <input
    className=" sd: mx-[-1px] flex-1 border border-gray-500 text-white bg-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Type your message..."
  />
  <button
    className="btn btn-primary text-white bg-blue-500 hover:bg-blue-600 rounded-full p-1 md:p-3  transition-colors"
    onClick={sendMessage}
  >
    Send
  </button>
</div>

    </div>
  );
};

export default Chat;
