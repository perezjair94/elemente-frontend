import { gql, useQuery, useSubscription } from "@apollo/client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams, useRevalidator } from "react-router-dom";
import Swal from "sweetalert2";

// GraphQL queries and subscriptions for messages
const GET_MESSAGES = gql`
  query MessagesByRoom($room: String!) {
    messagesByRoom(room: $room) {
      _id
      sender
      content
    }
  }
`;

// GraphQL subscription for new messages
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
  const [cookies] = useCookies(["email"]);
  let revalidator = useRevalidator();
  const sender = cookies?.email;

  const { data, loading } = useQuery(GET_MESSAGES, { variables: { room } }); // get messages from room

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

      revalidator.revalidate(); // revalidate the page to update the view

      setTimeout(() => {
        contianer.scrollTop = contianer.scrollHeight;
      }, 100); // scroll to bottom of container
    },
    variables: { room },
  }); // subscribe to new messages

  if (!sender && !loading)
    Swal.fire({
      icon: "error",
      title: "Please sign in to create a message",
    });

  return (
    <>
      {messages?.map((message) => (
        <div
          key={message._id}
          className={clsx(
            "p-4 self-start max-w-[80%] rounded-xl",
            message.sender === sender
              ? "bg-green-500 text-white ml-auto"
              : "bg-neutral-200 dark:bg-neutral-200/5",
          )}
        >
          {message.sender !== sender && (
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
