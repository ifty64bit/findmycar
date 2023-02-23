import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IError, IUser } from "@/types";
import Modal from "@/components/Modal";
import axios from "../lib/axios";

type Props = {};

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string().required("Password Required"),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Password Confirmation Required"),
    displayPhoto: Yup.mixed().required("Photo Required"),
});

function Register({}: Props) {
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>

            <main className="mt-28">
                <Header />
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-semibold">Register</h1>
                    <div>
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                                passwordConfirmation: "",
                                displayPhoto: null,
                            }}
                            validationSchema={RegisterSchema}
                            onSubmit={async (values) => {
                                const data = new FormData();
                                data.append("name", values.name);
                                data.append("email", values.email);
                                data.append("password", values.password);
                                data.append(
                                    "passwordConfirmation",
                                    values.passwordConfirmation
                                );
                                data.append(
                                    "displayPhoto",
                                    values?.displayPhoto !== null
                                        ? values.displayPhoto
                                        : ""
                                );
                                try {
                                    const { data: ResponseData } =
                                        await axios.post<IUser | IError>(
                                            "/auth/register",
                                            data
                                        );
                                    console.log(ResponseData);
                                    setIsDialogOpen(true);
                                    setErrorMsg("");
                                } catch (error: any) {
                                    console.log(error?.response?.data);
                                    setErrorMsg(
                                        error?.response?.data?.errors[0].msg
                                    );
                                }
                            }}
                        >
                            {({
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                setFieldValue,
                                values,
                            }) => (
                                <Form className="flex flex-col gap-4 mt-4">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                className="border rounded p-1 h-10 text-xl"
                                            />
                                            {errors.name && touched.name ? (
                                                <div className="text-red-600">
                                                    {errors.name}
                                                </div>
                                            ) : null}
                                        </div>
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
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2">
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
                                            {errors.password &&
                                            touched.password ? (
                                                <div className="text-red-600">
                                                    {errors.password}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="passwordConfirmation">
                                                Password Confirmation
                                            </label>
                                            <input
                                                type="password"
                                                name="passwordConfirmation"
                                                id="passwordConfirmation"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={
                                                    values.passwordConfirmation
                                                }
                                                className="border rounded p-1 h-10 text-xl"
                                            />
                                            {errors.passwordConfirmation &&
                                            touched.passwordConfirmation ? (
                                                <div className="text-red-600">
                                                    {
                                                        errors.passwordConfirmation
                                                    }
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="displayPhoto">
                                                Display Photo
                                            </label>
                                            <input
                                                type="file"
                                                name="displayPhoto"
                                                id="displayPhoto"
                                                onChange={(event) => {
                                                    setFieldValue(
                                                        "displayPhoto",
                                                        event?.currentTarget
                                                            ?.files[0]
                                                    );
                                                }}
                                                onBlur={handleBlur}
                                                className="p-1 h-10"
                                            />
                                            {errors.displayPhoto &&
                                            touched.displayPhoto ? (
                                                <div className="text-red-600">
                                                    {errors.displayPhoto}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <div className="w-44 h-48 border">
                                                {values.displayPhoto ? (
                                                    <img
                                                        src={URL.createObjectURL(
                                                            values.displayPhoto
                                                        )}
                                                        alt="displayPhoto"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Register
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div>
                        {errorMsg === "Email already exists" ? (
                            <p>
                                Email already exists{" "}
                                <Link href="/login" className="text-blue-600">
                                    Login Here
                                </Link>
                            </p>
                        ) : (
                            errorMsg
                        )}
                    </div>
                </div>
                <Modal
                    title="Success!!"
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                >
                    <h4 className="text-xl">Register Success</h4>
                    <p>Check Your email for confirmation</p>
                </Modal>
            </main>
        </>
    );
}

export default Register;
