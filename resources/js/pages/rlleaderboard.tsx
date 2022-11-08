import React, { ChangeEvent, useRef, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { IPageProps } from "../lib/types";
import Layout from "../components/Layout";
import useTitle from "../lib/use-title";
import IndexCard from "../components/Home/IndexCard";

interface IRlLeaderboardUser {
  rank?: number | string;
  username: string;
  institution: string;
  points?: number;
  number_of_referrals: number;
}

interface IRlLeaderboardProps {
  users: IRlLeaderboardUser[];
}

const RlLeaderboard: React.FC<IRlLeaderboardProps> = ({
  users,
}: IRlLeaderboardProps) => {
  useTitle("Leaderboard");
  const [displayUsers, setDisplayUsers] = useState<IRlLeaderboardUser[]>(
    users.sort(
      (a, b) => Number(b.number_of_referrals) - Number(a.number_of_referrals)
    )
  );
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    auth: { user },
    authenticated,
  } = usePage<IPageProps>().props;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDisplayUsers(
      users.filter(({ username }) =>
        username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <Layout authenticated={authenticated}>
      <div className="home-container h-screen flex flex-col justify-start items-center p-10">
        <h1 className="text-xl text-center sm:text-[2rem] lg:text-[4rem] font-bold tracking-wider leading-[1]">
          REFERRAL LEADERBOARD
        </h1>
        <div className="px-10 max-w-[1000px] w-full mx-auto">
          <input
            type="text"
            placeholder="Search"
            ref={searchRef}
            onChange={handleSearch}
            // className="w-full bg-gray-600 opacity-70 focus:opacity-90 p-6 text-lg text-white border-t-0 border-r-0 border-l-0 border-b-4 border-gray-400 focus:border-sudo transition"
            // className="w-full bg-dark-lighter px-6 py-4 text-lg text-white border-2 border-gray-400 rounded focus:border-sudo transition mb-4"
            className="bg-transparent text-gray-200 block w-full border-0 border-b-2 border-gray-600 transition focus:ring-0 focus:!outline-none focus:!shadow-none focus:border-sudo-red py-4 px-1"
            style={{ boxShadow: "none" }}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-10 max-w-[1000px] h-full w-full mx-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="font-extrabold text-xl uppercase text-sudo">
                <th className="p-5">Rank</th>
                <th className="p-5">Username</th>
                {/* <th className="p-5">Points</th> */}
                <th className="p-5">Referrals</th>
              </tr>
            </thead>
            <tbody>
              {/* {displayUsers.map(({ rank, username, points }, i) => ( */}
              {displayUsers.map(
                ({ rank, username, number_of_referrals }, i) => (
                  <tr
                    key={i}
                    className={
                      rank === "DQ"
                        ? "text-sudo-dark font-extrabold"
                        : "font-bold"
                    }
                  >
                    <td
                      className="text-lg text-center p-5 bg-none"
                      style={{ color: "inerit" }}
                    >
                      {i + 1}
                    </td>
                    <td
                      className="text-lg text-center p-5 bg-none"
                      style={{ color: "inerit" }}
                    >
                      {username}
                    </td>
                    <td
                      className="text-lg text-center p-5 bg-none"
                      style={{ color: "inerit" }}
                    >
                      {/* {points} */}
                      {number_of_referrals}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default RlLeaderboard;
