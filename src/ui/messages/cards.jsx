import { gql, useQuery, useSubscription } from "@apollo/client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams, useRevalidator } from "react-router-dom";

const GET_MESSAGES = gql`
  query MessagesByRoom($room: String!) {
    messagesByRoom(room: $room) {
      _id
      sender
      content
    }
  }
`;

const MESSAGE_SUSCRIPTION = gql`
  subscription OnMessageAdded($room: String!) {
    messageAdded(room: $room) {
      _id
      sender
      content
    }
  }
`;

export default function Messages() {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [cookies] = useCookies();
  let revalidator = useRevalidator();

  const { data } = useQuery(GET_MESSAGES, { variables: { room } });

  useEffect(() => {
    if (data?.messagesByRoom && data?.messagesByRoom.length > 0) {
      setMessages(data?.messagesByRoom);
    }
  }, [data]);

  useSubscription(MESSAGE_SUSCRIPTION, {
    onData: ({ data }) => {
      const contianer = document.getElementById("container");
      const message = data.data.messageAdded;
      setMessages([...messages, message]);
      revalidator.revalidate();
      setTimeout(() => {
        contianer.scrollTop = contianer.scrollHeight;
      }, 100);
    },
    variables: { room },
  });

  return (
    <>
      {messages?.map((message) => (
        <div
          key={message._id}
          className={clsx(
            "p-4 self-start max-w-[80%] rounded-xl",
            message.sender === cookies.email
              ? "bg-green-500 text-white ml-auto"
              : "bg-neutral-200 dark:bg-neutral-200/5",
          )}
        >
          {message.sender !== cookies.email && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {message.sender}
            </p>
          )}
          <p>{message.content}</p>
        </div>
      ))}
    </>
  );
}
