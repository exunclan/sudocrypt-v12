import { Link, usePage } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Layout from "../../components/Layout";
import { IPageProps } from "../../lib/types";

interface IAdminLevelsProps {
  levels: {
    id: number;
    question: string;
    answer?: string;
    is_story: boolean;
  }[];
  error?: string;
}

const Levels: React.FC<IAdminLevelsProps> = ({
  levels,
  error,
}: IAdminLevelsProps) => {
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
      <div className="home-container sm:h-screen relative flex justify-center items-center gap-x-14">
        <div className="bg-dark-lighter p-6 shadow-md max-w-sm w-full rounded-lg">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 justify-center items-center gap-x-2">
            {levels.map((lvl, i) => (
              <Link
                key={i}
                href={`/admin/levels/${lvl.id}`}
                className={`${"bg-dark border-gray-600 text-gray-600"} bg-opacity-30 border-2 rounded-lg font-bold text-sm h-8 w-8 flex justify-center items-center cursor-pointer`}
              >
                {lvl.id}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Levels;
