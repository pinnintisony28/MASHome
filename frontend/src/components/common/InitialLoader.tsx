
import { useEffect, useState } from "react";
import Logo from "../../assets/final.png";

type InitialLoaderProps = {
  onComplete: () => void;
};

export default function InitialLoader({
  onComplete,
}: InitialLoaderProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
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
      <img
        src={Logo}
        alt="MASHome"
        className="h-24 w-auto object-contain opacity-0 animate-[fadeIn_1s_ease-out_forwards] sm:h-28"
      />
    </div>
  );
}
