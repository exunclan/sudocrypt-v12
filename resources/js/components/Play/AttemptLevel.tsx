import { useForm, usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useRef } from "react";
import { IPageProps } from "../../lib/types";
import TextInput from "../TextInput";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setData(
      "attempt",
      e.target.value
        .split("")
        .filter((x: string) => /[a-z0-9-_{}:()|&;@#ʻ]{1}/.test(x))
        .join("")
    );
  };

  return (
    <div>
      <div className="text-sudo text-4xl sm:text-6xl font-extrabold">
        Question
      </div>
      <div className="w-full flex flex-col max-w-[700px]">
        <div
          className="text-md mt-5 font-regular"
          dangerouslySetInnerHTML={{
            __html: user.level?.question as string,
          }}
        />
        <div className="text-sudo-light text-xs uppercase font-bold self-end">
          Level {user.level?.id} &middot; {user.level?.points} Points
        </div>
        <form
          className="w-full block flex flex-col"
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
          {user.level?.is_story ? (
            <input
              type="text"
              name="attempt"
              placeholder="Answer"
              className="flex-1 min-w-0 w-auto border border-white p-5 bg-dark text-white h-full focus:border-white focus:ring-0 focus:shadow-none text-sm mt-12 hidden"
              style={{ boxShadow: "none" }}
              autoComplete="off"
              ref={inputRef}
              value=""
              disabled={true}
            />
          ) : (
            <input
              type="text"
              name="attempt"
              placeholder="Answer"
              className="flex-1 min-w-0 w-auto border border-white p-5 bg-dark text-white h-full focus:border-white focus:ring-0 focus:shadow-none text-sm mt-12"
              style={{ boxShadow: "none" }}
              autoComplete="off"
              ref={inputRef}
              value={data.attempt}
              disabled={processing}
              onChange={handleChange}
            />
          )}
          <button
            type="submit"
            disabled={processing}
            className="bg-[#D1483B] text-sm font-bold p-5 uppercase h-full flex items-center justify-center transition focus:outline-none self-end mt-12"
          >
            submit
          </button>

          <div className="text-sm text-red-500 my-3 hidden sm:block">
            {errors.attempt}
          </div>
          {
            // <div className="block sm:hidden">
            //   <TextInput
            //     name="answer"
            //     placeholder="Answer"
            //     className="bg-dark"
            //     containerClassName="my-5"
            //     type="text"
            //     disabled={processing}
            //     error={errors.attempt}
            //     value={data.attempt}
            //     onChange={handleChange}
            //   />
            //   <div className="flex w-full justify-center">
            //     <button type="submit" className="button">
            //       Submit
            //     </button>
            //   </div>
            // </div>
            //
          }
        </form>
      </div>
    </div>
  );
};

export default AttemptLevel;
