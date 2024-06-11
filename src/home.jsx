import RoomForm from "./ui/room-form";

// Home page and room form for creating a room
export default function Home() {
  return (
    <main className="max-w-[400px] mx-auto">
      <h1>Let’s find your room</h1>
      <p>We suggest using your personal email address.</p>
      <RoomForm />
    </main>
  );
}
