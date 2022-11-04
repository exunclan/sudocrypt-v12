import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import Recaptcha from "react-google-recaptcha";
import TextInput from "../../components/TextInput";
import Layout from "../../components/Layout";
import useTitle from "../../lib/use-title";
import { IPageProps } from "../../lib/types";
import IndexCard from "../../components/Home/IndexCard";

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
    <Layout>
      <div className="flex flex-col lg:px-24 px-5 w-1/2 mx-auto">
        <h1 className="text-white font-mono text-5xl uppercase">Register</h1>
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
      </div>
    </Layout>
  );
};

export default Register;
