import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function RoomForm() {
  const [cookies, setCookie] = useCookies(["room"]);
  const navigate = useNavigate();

  console.log(cookies.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const room = formData.get("room");

    setCookie("email", email); // save email in cookie

    if (room) return navigate(`/messages/${room}`); // redirect to messages page

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="room"
        placeholder="Your slug room e.g. room-test-slug"
        className="mt-8 w-full p-2 rounded-md dark:bg-neutral-200/5 border border-neutral-400 dark:border-neutral-200/10"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        className="mt-3 w-full p-2 rounded-md dark:bg-neutral-200/5 border border-neutral-400 dark:border-neutral-200/10"
        required
      />
      <button className="p-2 w-full mt-4 rounded-md bg-green-500 text-white disabled:bg-neutral-400 disabled:text-neutral-500 dark:bg-green-600">
        Continuar
      </button>
    </form>
  );
}
