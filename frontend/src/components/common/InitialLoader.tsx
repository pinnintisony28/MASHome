import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type InitialLoaderProps = {
  onComplete: () => void;
};

// Letter-by-letter typing animation
function TypingMessage() {
  const text = "Hello ";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        index += 1;
        setDisplayText(text.slice(0, index));
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <span>
      {displayText}
      <span className="ml-0.5 animate-pulse">|</span>
    </span>
  );
}

export default function InitialLoader({
  onComplete,
}: InitialLoaderProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 500);

      return () => clearTimeout(completeTimer);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-slate-50
        transition-opacity duration-500
        ${
          fadeOut
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }
      `}
    >
      <div className="flex flex-col items-center">

        {/* Lottie Animation */}
        <div className="h-40 w-40 sm:h-48 sm:w-48">
          <DotLottieReact
            src="/loading.lottie"
            loop
            autoplay
          />
        </div>

        {/* Text */}
        <div className="-mt-2 text-center">

          {/* <h1
            className="text-2xl font-bold text-slate-800"
            style={{
              fontFamily: "Roboto Slab",
            }}
          >
            MASHome
          </h1> */}

          {/* Letter-by-letter typing */}
          <h1
            className="text-2xl font-bold text-slate-800"
            style={{
              fontFamily: "Roboto Slab",
            }}
          >
            <TypingMessage />
          </h1>

        </div>

      </div>
    </div>
  );
}