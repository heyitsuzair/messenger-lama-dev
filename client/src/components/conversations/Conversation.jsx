import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_HOST + "users?userId=" + friendId
        );
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      {user && (
        <div className="conversation">
          <img
            className="conversationImg"
            src={
              user.profilePicture
                ? user.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "person/noAvatar.png"
            }
            alt=""
          />
          <span className="conversationName">{user.username}</span>
        </div>
      )}
    </>
  );
}
