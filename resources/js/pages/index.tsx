import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../components/Layout";
import { IPageProps } from "../lib/types";

const Index: React.FC = () => {
  const {
    props: {
      auth: { user: { username } },
      authenticated
    }
  } = usePage<IPageProps>();


  return (
    <Layout footer={true}>
      <div className="h-full w-full flex flex-col items-center justify-center sm:gap-y-2 md:gap-y-6 lg:gap-y-10 my-20">
        <div className="text-xl sm:text-[2rem] lg:text-[4rem] font-bold tracking-wider h-[2rem] sm:h-[4rem]">
          SUDOCRYPT v12
        </div>

        <div className="w-full text-sudo-red text-md sm:text-xl lg:text-3xl text-center font-mono">
          9 November 2022 <span className="text-white">-</span>{" "}
          <span className="text-sudo-yellow">10 November 2022</span>
        </div>

        {authenticated && (
          <div className="w-full text-md sm:text-xl lg:text-3xl text-center font-mono">
            Your referral code is: <span>{username}</span>
          </div>
        )}

        <div className="flex msm:flex-col gap-y-3 items-center max-w-[900px] w-full gap-x-8 flex-wrap">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferer noreferrer"
            className="px-2 py-2 md:py-6 text-sm md:text-xl lg:text-3xl flex-1 text-center border border-white font-mono hover:bg-white hover:text-dark transition"
          >
            Discord
          </a>

          <Link
            href="/auth/register"
            target="_blank"
            rel="noopener noreferer noreferrer"
            className="px-3 py-2 md:py-6 text-sm md:text-xl lg:text-3xl flex-1 text-center border border-sudo-red text-sudo-yellow font-mono hover:bg-sudo-red transition"
          >
            Register
          </Link>

          <a
            href="https://exunclan.com/resources"
            target="_blank"
            rel="noopener noreferer noreferrer"
            className="px-2 py-2 md:py-6 text-sm md:text-xl lg:text-3xl flex-1 text-center border border-white font-mono hover:bg-white hover:text-dark transition"
          >
            Resources
          </a>

        </div>


      </div>
    </Layout>
  );
};

export default Index;
