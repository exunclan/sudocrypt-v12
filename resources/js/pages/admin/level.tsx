import { Link, usePage } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Circle from "../../components/Admin/Circle";
import EditLevel from "../../components/Admin/Level";
import Layout from "../../components/Layout";
import { ILevel, IPageProps } from "../../lib/types";
import useTitle from "../../lib/use-title";

interface IAdminLevelProps {
  levels: { id: number; question: string; answer: string }[];
  level?: ILevel & {
    attempts_count: number;
    users_count: number;
    solves_count: number;
  };
  error?: string;
}

const Level: React.FC<IAdminLevelProps> = ({
  levels,
  level,
  error,
}: IAdminLevelProps) => {
  useTitle(`Level ${level?.id}`);
  const { addToast } = useToasts();
  const {
    props: {
      auth: { user },
    },
  } = usePage<IPageProps>();

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error" });
    }
  }, []);

  return (
    <Layout authenticated admin>
      <div className="home-container relative flex flex-col sm:flex-row justify-center items-center gap-y-10 sm:gap-y-0 sm:gap-x-14">
        <div className="bg-dark-lighter p-6 shadow-md max-w-sm w-full rounded-lg">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 justify-center items-center gap-x-2">
            {levels.map((lvl, i) => (
              <Link
                key={i}
                className={`${
                  level?.id === lvl.id
                    ? "bg-yellow-400 border-yellow-400"
                    : "bg-dark border-gray-600 text-gray-600"
                } bg-opacity-30 border-2 rounded-lg font-bold text-sm h-8 w-8 flex justify-center items-center cursor-pointer transition`}
                href={`/admin/levels/${lvl.id}`}
              >
                {lvl.id - 1}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full sm:max-w-sm px-5 py-10 sm:p-0">
          <div className="bg-dark-lighter px-6 py-2 rounded-lg sm:max-h-screen sm:overflow-y-auto w-full">
            <div className="my-5 border-b border-gray-600">
              {[
                ["Attempts", level?.attempts_count],
                ["Users on level", level?.users_count],
                ["Solves", level?.solves_count],
              ].map(([label, value], i) => (
                <div className="flex justify-between items-center my-3" key={i}>
                  <div className="uppercase font-bold text-md text-gray-600">
                    {label}
                  </div>
                  <div className="font-mono font-extrabold text-xl">
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="my-5 pb-5 border-b border-gray-600">
              <EditLevel level={level} />
            </div>
            {
              // <div className="my-5">
              //   // <Circle
              //   //   circle={circles.find((x) => x.levels.includes(level?.id || 0))}
              //   // />
              // </div>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Level;
