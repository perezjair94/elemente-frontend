import RoomForm from "./ui/room-form";

export default function Home() {
  return (
    <main className="max-w-[400px] mx-auto">
      <h1>Let’s find your room</h1>
      <p>We suggest using your personal email address.</p>
      <RoomForm />
    </main>
  );
}
