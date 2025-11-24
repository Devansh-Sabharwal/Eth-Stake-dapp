import { useEffect, useState } from "react";
import MainApp from "./MainApp";

export default function App() {
  const [notLaptop, setNotLaptop] = useState(window.innerWidth < 800);

  useEffect(() => {
    const check = () => setNotLaptop(window.innerWidth < 800);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="h-screen w-screen">
      {notLaptop ? (
        <div className="h-full w-full bg-black text-white flex items-center justify-center text-center p-6">
          This app doesn’t work on mobile. Why? Because I’m too lazy to make it
          responsive. Come back on a laptop.
        </div>
      ) : (
        <MainApp />
      )}
    </div>
  );
}
