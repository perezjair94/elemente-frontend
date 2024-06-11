import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const ADD_MESSAGE = gql`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      _id
      content
      sender
      room
    }
  }
`;

export default function MessageForm() {
  const { room } = useParams();
  const [cookies] = useCookies();

  const [addMessage, { loading, error }] = useMutation(ADD_MESSAGE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get("content");

    await addMessage({
      variables: {
        createMessageInput: {
          room,
          sender: cookies.email,
          content,
        },
      },
    });

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mt-4 space-x-2">
        <input
          type="text"
          name="content"
          placeholder="Type a message"
          autoComplete="off"
          className="w-full p-2 rounded-md dark:bg-neutral-200/5 border border-neutral-400 dark:border-neutral-200/10"
          required
        />
        <button
          className="p-2 rounded-md bg-green-500 text-white disabled:bg-neutral-400 disabled:text-neutral-500 dark:bg-green-600"
          disabled={loading}
        >
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 3 3 9-3 9 19-9Z" />
              <path d="M6 12h16" />
            </svg>
          )}
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">Error creating message </p>}
    </form>
  );
}
