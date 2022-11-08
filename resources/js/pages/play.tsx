import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { INotification, IPageProps } from "../lib/types";
import useTitle from "../lib/use-title";
import { useToasts } from "react-toast-notifications";
import AttemptLevel from "../components/Play/AttemptLevel";
import Modal from "react-modal";
import echo from "../lib/echo";

interface IPlayProps {
  // circles: { id: number; name: string; levels: number[] }[];
  // completed_levels: number[];
  error?: string;
  notifications: INotification[];
  hint: string;
  levels: {
    id: number;
    question: string;
    is_story: boolean;
    is_completed: boolean;
    is_current_level: boolean;
  }[];
  previous_stories: {
    id: number;
    question: string;
  }[];
}

const Play: React.FC<IPlayProps> = ({
  levels,
  // completed_levels,
  error,
  notifications: _notifications,
  hint,
  previous_stories,
}: IPlayProps) => {
  useTitle("Play");
  const { addToast } = useToasts();
  const [notifications, setNotifications] =
    React.useState<INotification[]>(_notifications);
  const {
    props: {
      auth: { user },
    },
  } = usePage<IPageProps>();

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error" });
    }
    echo
      .channel("notifications")
      .listen(
        "NotificationCreated",
        (e: { notifications: INotification[] }) => {
          setNotifications(e.notifications);
        }
      );
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chosenStory, setChosenStory] = useState<{
    id: number;
    question: string;
  } | null>();

  const closeModal = () => {
    setChosenStory(null);
    setModalIsOpen(false);
  };

  return (
    <Layout authenticated notifications={notifications}>
      <div className="home-container h-full flex flex-col justify-center items-center sm:gap-x-14 gap-y-10 sm:gap-y-0 p-5 sm:p-0 my-6">
        <p dangerouslySetInnerHTML={{ __html: `<!-- ${hint} -->` }}></p>
        {user.level_id ? (
          <AttemptLevel />
        ) : (
          <div>
            <div className="bg-dark-lighter p-6 shadow-md max-w-sm w-full rounded-lg my-10">
              Sab khatam.... ab bahar ghoomle zara
            </div>
          </div>
        )}
        <div className="grid grid-cols-5 gap-2 place-items-center w-full max-w-[500px] overflow-x-scroll">
          {levels.map((lvl, i) =>
            previous_stories.map((story) => story.id).includes(lvl.id) ? (
              <div
                key={i}
                className={`${
                  lvl.is_completed
                    ? "bg-sudo border-sudo bg-opacity-30 "
                    : lvl.is_current_level
                    ? "bg-sudo border-sudo"
                    : "bg-dark border-gray-600 text-gray-600 bg-opacity-30"
                } border-2 cursor-pointer bg-[#2977f5] rounded font-bold text-sm h-8 w-8 p-2 flex justify-center items-center`}
                onClick={() => {
                  setChosenStory({ id: lvl.id, question: lvl.question });
                  setModalIsOpen(true);
                }}
              >
                {lvl.id - 1}
              </div>
            ) : (
              <div
                key={i}
                className={`${
                  lvl.is_completed
                    ? "bg-sudo border-sudo bg-opacity-30 "
                    : lvl.is_current_level
                    ? "bg-sudo border-sudo"
                    : "bg-dark border-gray-600 text-gray-600 bg-opacity-30"
                } border-2 rounded font-bold text-sm h-8 w-8 p-2 flex justify-center items-center`}
              >
                {lvl.id - 1}
              </div>
            )
          )}
        </div>
        <Modal
          style={{
            overlay: {
              backgroundColor: "#00000070",
            },
            content: {
              backgroundColor: "#000000",
              color: "white",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              maxHeight: "80vh",
              overflowY: "scroll",
              textAlign: "center",
              fontSize: "12px",
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          <p
            dangerouslySetInnerHTML={{
              __html: chosenStory ? chosenStory.question : "",
            }}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default Play;
