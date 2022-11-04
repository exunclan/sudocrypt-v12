import React from "react";
import Countdown from "../components/Countdown";
import useTitle from "../lib/use-title";

const ComingSoon: React.FC = () => {
  useTitle("Coming Soon");
  return (
    <div className="bg-dark w-full min-h-screen py-12">
      <div className="flex justify-center items-center h-full sm:h-[calc(100vh-104px-120px)] w-full px-4 py-8">
        <div className="w-full max-w-2xl h-auto flex flex-col justify-center items-center p-0 sm:p-8">
          <img
            src="/img/logo-red.png"
            alt="Sudocrypt 2021-22"
            className="h-32 w-32 sm:h-44 sm:w-44 mb-12 mr-3"
          />
          <h1 className="w-full text-white text-2xl font-mono sm:text-4xl font-bold mb-6 text-center">
            Sudocrypt v12.0
          </h1>
          <h1 className="w-full text-sudo-red text-2xl sm:text-3xl font-normal mb-6 text-center">
            9 November 2022 <span className="text-white">-</span>{" "}
            <span className="text-sudo-yellow">10 November 2022</span>
          </h1>
          <h1 className="w-full text-sudo-red uppercase text-xl sm:text-2xl font-normal mb-6 text-center"></h1>
          <Countdown
            onZero={() => {
              window.location.href = "https://sudocrypt.com";
            }}
          />
          <a
            href="//exun.co/sudocrypt"
            target={"_blank"}
            rel="noreferrer"
            className="border cursor-pointer mt-6 text-xl border-sudo-red text-sudo-red transition duration-200 ease-in-out hover:bg-sudo-red hover:text-white py-4 px-6"
          >
            Discord
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
