import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { IPageProps } from "../lib/types";

function countdownTo(dt: string): ICountdown {
  const fmt = (n: number) => String(Math.floor(n)).padStart(2, "0");
  const diff = (Date.parse(dt) - Date.now()) / 1000;
  const days = fmt(diff / (60 * 60 * 24));
  const hours = fmt((diff / (60 * 60)) % 24);
  const minutes = fmt((diff / 60) % 60);
  const seconds = fmt(diff % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

interface ICountdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface ICountdownProps extends React.HTMLProps<HTMLDivElement> {
  onZero: () => void;
}

const Countdown: React.FC<ICountdownProps> = ({
  className,
  style,
  onZero,
}: ICountdownProps) => {
  const { dates, started, ended } = usePage<IPageProps>().props;
  console.log(dates, started, ended);
  if (ended) {
    return (
      <div style={style} className="text-white">
        <div>Sudocrypt 2022 has ended</div>
      </div>
    );
  }

  const date = started ? dates.end : dates.start;
  const [countdown, setCountdown] = useState<ICountdown>(countdownTo(date));

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        countdownTo(date).days == "00" &&
        countdownTo(date).hours == "00" &&
        countdownTo(date).minutes == "00" &&
        countdownTo(date).seconds == "00"
      ) {
        onZero();
      }
      setCountdown(countdownTo(date));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={style}
      className="flex gap-x-4 border border-sudo-green border-opacity-30 p-3 rounded-lg"
    >
      <div className="flex flex-col space-x-2 items-center">
        <span className="text-4xl md:text-6xl mb-2 font-extrabold text-sudo-green">
          {countdown.days}
        </span>
        <span className="uppercase text-sm font-bold text-white">
          DAY{countdown.days !== "01" && "S"}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl mb-2 font-extrabold text-sudo-green">
          {countdown.hours}
        </span>
        <span className="uppercase text-sm font-bold text-white">HR</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl mb-2 font-extrabold text-sudo-green">
          {countdown.minutes}
        </span>
        <span className="uppercase text-sm font-bold text-white">Min</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl mb-2 font-extrabold text-sudo-green">
          {countdown.seconds}
        </span>
        <span className="uppercase text-sm font-bold text-white">Sec</span>
      </div>
    </div>
  );
};

export default Countdown;
