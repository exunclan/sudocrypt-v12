import { useForm, usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useRef } from "react";
import { IPageProps } from "../lib/types";

const AttemptLevel: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    props: {
      auth: { user },
    },
  } = usePage<IPageProps>();
  const { data, setData, processing, post, errors } = useForm({
    attempt: "",
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <div className="text-sudo text-6xl font-extrabold">Play</div>
      <div className="bg-dark-lighter p-6 shadow-md max-w-sm w-full rounded-lg my-10">
        <div className="text-sudo-light text-sm uppercase font-bold">
          Level {user.level?.id}
        </div>
        <div
          className="text-lg my-5"
          dangerouslySetInnerHTML={{
            __html: user.level?.question as string,
          }}
        />
        <form
          className="w-full block"
          onSubmit={(e) => {
            e.preventDefault();
            post("", {
              preserveState: true,
              preserveScroll: true,
              onFinish: () => {
                setData("attempt", "");
                inputRef.current?.focus();
              },
            });
          }}
        >
          <div className="mt-5 flex w-full focus-within:ring-4 ring-sudo rounded-lg transition">
            <input
              type="text"
              name="attempt"
              placeholder="Answer"
              className="flex-1 min-w-0 w-auto border-none rounded-tl-lg rounded-bl-lg p-5 bg-dark text-white h-full focus:border-none focus:outline-none focus:ring-0 focus:shadow-none"
              style={{ boxShadow: "none" }}
              autoComplete="off"
              ref={inputRef}
              value={data.attempt}
              disabled={processing}
              onChange={(e) => {
                e.preventDefault();
                setData(
                  "attempt",
                  e.target.value
                    .split("")
                    .filter((x) => /[a-z0-9_]{1}/.test(x))
                    .join("")
                );
              }}
            />
            <button
              type="submit"
              disabled={processing}
              className="bg-sudo focus:bg-sudo-dark text-sm font-bold p-5 uppercase rounded-tr-lg rounded-br-lg h-full flex items-center justify-center transition focus:outline-none"
            >
              submit
            </button>
          </div>
          <div className="text-sm text-red-500 my-3">{errors.attempt}</div>
        </form>
      </div>
    </div>
  );
};

export default AttemptLevel;
