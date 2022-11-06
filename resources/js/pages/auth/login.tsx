import { Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import TextInput from "../../components/TextInput";
import Layout from "../../components/Layout";
import useTitle from "../../lib/use-title";
import { useToasts } from "react-toast-notifications";
import { IPageProps } from "../../lib/types";
import { usePage } from "@inertiajs/inertia-react";
import IndexCard from "../../components/Home/IndexCard";

interface IProps {
  error?: string;
}

const Login: React.FC<IProps> = ({ error }: IProps) => {
  useTitle("Login");
  const { addToast } = useToasts();
  const {
    props: {
      flash: { error: flashError },
    },
  } = usePage<IPageProps>();
  const { setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (flashError) {
      addToast(flashError, { appearance: "error" });
    }
  }, []);

  // type InputName = "email" | "password";
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setData(e.target.name as "email" | "password", e.target.value);

  return (
    <Layout>
      <div className="flex flex-col lg:px-24 pb-12 px-5 w-1/2 mx-auto">
        <form
          className="w-full h-full overflow-y-auto"
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            post("/auth/login", {
              preserveState: true,
            });
          }}
        >
          <h1 className="text-white font-mono text-4xl mb-4 uppercase">
            Login
          </h1>
          <TextInput
            name="email"
            placeholder="Email"
            containerClassName="my-5"
            type="email"
            disabled={processing}
            error={errors.email}
            onChange={handleChange}
          />

          <TextInput
            name="password"
            placeholder="Password"
            containerClassName="my-5"
            type="password"
            disabled={processing}
            error={errors.password}
            onChange={handleChange}
          />

          {error && (
            <div className="my-5">
              <div className="text-red-500 text-center font-bold">{error}</div>
            </div>
          )}

          <button className="text-white w-full bg-sudo-red px-4 py-4 mt-4 transition duration-200 ease-in-out hover:opacity-80">
            Login
          </button>

          {/* <div className="my-5 text-center uppercase font-bold text-gray-600">
            or
          </div>

          <div className="flex justify-center my-5">
            <Link
              className="focus:ring-[#3e48b4] !bg-[#5865F2] !flex items-center justify-center button"
              disabled={processing}
              href="/discord/login"
            >
              <img
                src="/img/Discord-Logo-White.svg"
                className="h-4 w-auto mr-2"
              />
              Login with Discord
            </Link>
          </div> */}

          <div className="my-5">
            <div className="text-base text-center">
              Don&apos;t have an account?{" "}
              <Link
                className="font-bold text-sudo focus:text-sudo-light"
                href="/auth/register"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
