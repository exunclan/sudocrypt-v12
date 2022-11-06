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
    <Layout footer={true}>
      <div className="h-full w-full max-w-[500px] flex flex-col items-center justify-center mx-auto my-10 px-3">
        <form
          className="w-full flex flex-col gap-y-5"
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            post("/auth/login", {
              preserveState: true,
            });
          }}
        >
          <h1 className="text-white text-2xl uppercase">
            Login
          </h1>

          <TextInput
            name="email"
            placeholder="E-MAIL"
            type="email"
            disabled={processing}
            error={errors.email}
            onChange={handleChange}
          />

          <TextInput
            name="password"
            placeholder="PASSWORD"
            type="password"
            disabled={processing}
            error={errors.password}
            onChange={handleChange}
          />

          {error && (
            <div>
              <div className="text-red-500 text-center font-bold">{error}</div>
            </div>
          )}

          <button
            type="submit"
            className="text-white w-full bg-sudo-red px-4 py-4 transition duration-200 ease-in-out hover:opacity-80"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col gap-y-4 mt-10 text-white font-mono">
          <div className="text-center uppercase">
            or
          </div>
          <div>
            <Link
              className="flex items-center justify-center gap-x-3"
              disabled={processing}
              href="/discord/login"
            >
              <img
                src="/img/Discord-Logo-White.svg"
                className="h-4 w-auto"
              />
              <span className="text-sudo-yellow border-b-2 border-sudo-yellow">Login with Discord</span>
            </Link>
          </div>
          <div>
            <div className="text-base text-center">
              Don&apos;t have an account?{" "}
              <Link
                className="text-sudo-red border-b-2 border-sudo-red pb-1"
                href="/auth/register"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Login;
