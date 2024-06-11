import Messages from "./ui/messages/cards";
import MessageForm from "./ui/messages/create-form";

export default function MessagesPage() {
  return (
    <main>
      <h1 className="mb-4">Messages</h1>
      <div
        id="container"
        className="h-[calc(100dvh-180px)] w-full overflow-y-auto overscroll-auto flex flex-col space-y-2"
      >
        <Messages />
      </div>
      <MessageForm />
    </main>
  );
}
