import Header from "@/components/Header";
import Head from "next/head";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../lib/axios";
import { useRouter } from "next/router";

type Props = {};

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string().required("Password Required"),
});

function Login({}: Props) {
    const [errorMsg, setErrorMsg] = useState<string>("");

    const router = useRouter();
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <main className="mt-28">
                <Header />
                <section className="flex justify-center items-center">
                    <div>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={async (values) => {
                                const data = new FormData();
                                data.append("email", values.email);
                                data.append("password", values.password);
                                try {
                                    const { data: ResponseData } =
                                        await axios.post<any>(
                                            "/auth/login",
                                            data
                                        );
                                    localStorage.setItem(
                                        "token",
                                        ResponseData?.token
                                    );
                                    setErrorMsg("");
                                    router.push("/dashboard");
                                } catch (error: any) {
                                    console.log(error?.response?.data);
                                    setErrorMsg(error?.response?.data?.message);
                                }
                            }}
                        >
                            {({
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                values,
                            }) => (
                                <Form className="flex flex-col gap-4 mt-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className="border rounded p-1 h-10 text-xl"
                                        />
                                        {errors.email && touched.email ? (
                                            <div className="text-red-600">
                                                {errors.email}
                                            </div>
                                        ) : null}
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className="border rounded p-1 h-10 text-xl"
                                        />
                                        {errors.password && touched.password ? (
                                            <div className="text-red-600">
                                                {errors.password}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <div className="mt-4 text-red-600">
                                        {errorMsg}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;
