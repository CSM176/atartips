import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [isFull, setIsFull] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.atartips.com/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setIsFull(true);
    } catch (err) {
      setStatus("error");
    }
  };

  if (isFull) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#003D9A] to-[#2B0074] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-bold mb-4 text-center font-alfa">Sorry, we're full!</h1>
        <p className="text-lg opacity-70 text-center mb-10 max-w-lg font-oswald">
          Too many punters have signed up! Check back later.
        </p>
        <footer className="opacity-40 text-sm mt-16">©2025 Pigeon Software · ATARtips · No money is exchanged on this site</footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#003D9A] to-[#2B0074] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold mb-4 text-center font-alfa">ATARS MADE FUN.</h1>
      <p className="text-lg opacity-70 text-center mb-10 max-w-lg font-oswald">
        ATAR's got you anxious? Make it worse!
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4 font-bitcount">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email to get started..."
          className="p-3 rounded-xl text-white"
        />
        <button
          type="submit"
          className="bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition"
        >
          Get Started
        </button>
        {status === "loading" && (
          <p className="text-sm text-yellow-400 text-center">Sending...</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400 text-center">Something went wrong.</p>
        )}
      </form>
      <footer className="opacity-40 text-sm mt-16">©2025 Pigeon Software · ATARtips · No money is exchanged on this site</footer>
    </div>
  );
}