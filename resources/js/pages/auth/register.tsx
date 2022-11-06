import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import Recaptcha from "react-google-recaptcha";
import TextInput from "../../components/TextInput";
import Layout from "../../components/Layout";
import useTitle from "../../lib/use-title";
import { IPageProps } from "../../lib/types";

const Register: React.FC = () => {
  useTitle("Register");
  const { errors } = usePage<IPageProps>().props;
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    institution: "",
    password: "",
    recaptcha: "",
    referred_by: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
    setData((values) => {
      return { ...values, [e.target.name as string]: e.target.value as string };
    });

  return (
    <Layout footer={true}>
      <div className="h-full w-full max-w-[500px] flex flex-col items-center justify-center mx-auto my-10 px-3">
        <form
          className="w-full flex flex-col gap-y-5"
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            Inertia.post("/auth/register", data, {
              preserveState: true,
              preserveScroll: true,
            });
          }}
        >
          <h1 className="text-white text-2xl uppercase">
            Register
          </h1>

          <TextInput
            name="name"
            placeholder="NAME"
            containerClassName="my-5"
            type="text"
            value={data.name}
            disabled={false}
            error={errors.name}
            onChange={handleChange}
          />

          <TextInput
            name="username"
            placeholder="USERNAME"
            containerClassName="my-5"
            type="text"
            value={data.username}
            disabled={false}
            error={errors.username}
            onChange={handleChange}
          />

          <TextInput
            name="email"
            placeholder="EMAIL"
            containerClassName="my-5"
            type="email"
            value={data.email}
            disabled={false}
            error={errors.email}
            onChange={handleChange}
          />

          <TextInput
            name="institution"
            placeholder="INSTITUTION"
            containerClassName="my-5"
            type="text"
            value={data.institution}
            disabled={false}
            error={errors.institution}
            onChange={handleChange}
          />

          <TextInput
            name="password"
            placeholder="PASSWORD"
            containerClassName="my-5"
            type="password"
            value={data.password}
            disabled={false}
            error={errors.password}
            onChange={handleChange}
          />

          <TextInput
            name="referred_by"
            placeholder="REFERRAL CODE"
            containerClassName="my-5"
            type="text"
            value={data.referred_by}
            disabled={false}
            error={errors.referred_by}
            onChange={handleChange}
          />
          <Recaptcha
            sitekey="6Ld3iU0cAAAAAH_pvjPNK_fUs695Tn4Dnq33Q4zI"
            theme="dark"
            size="normal"
            onChange={(token: string | null) => {
              setData((values) => {
                return { ...values, recaptcha: token || "" };
              });
            }}
            onExpired={() => {
              setData((values) => {
                return { ...values, recaptcha: "" };
              });
            }}
          />
          {errors.recaptcha && (
            <p className="text-sudo-red text-sm">{errors.recaptcha}</p>
          )}

          <button
            type="submit"
            className="text-white w-full bg-sudo-red px-4 py-4 transition duration-200 ease-in-out hover:opacity-80"
          >
            Register
          </button>
        </form>

        <div className="flex flex-col gap-y-4 mt-10 text-white font-mono">
          <div>
            <div className="text-base text-center">
              Already have an account?{" "}
              <Link
                className="text-sudo-red border-b-2 border-sudo-red pb-1"
                href="/auth/login"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Register;
