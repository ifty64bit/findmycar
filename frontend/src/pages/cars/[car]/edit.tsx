import Modal from "@/components/Modal";
import useAuth from "@/hooks/useAuth";
import MainLayout from "@/layouts/MainLayout";
import { ICar } from "@/types";
import { Switch } from "@mui/material";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "../../../lib/axios";

type Props = {};

const updateCarSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    brand: Yup.string().required("Brand Required"),
    year: Yup.number().required("Year Required"),
    price: Yup.number().required("Price Required"),
    description: Yup.string().required("Description Required"),
    seats: Yup.number().required("Seats Required"),
    isAvailable: Yup.boolean().required("Availability Required"),
});

function Edit({}: Props) {
    const router = useRouter();
    const isLoggedIn = useAuth();
    const { car } = router.query;
    const [carData, setCarData] = useState<ICar | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    if (isLoggedIn === false) router.push("/login");
    useEffect(() => {
        (async () => {
            try {
                if (!car) return;
                const { data } = await axios.get(`/cars/${car}`);
                setCarData(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [car]);
    return (
        <>
            <Head>
                <title>Edit</title>
            </Head>
            <main>
                <MainLayout>
                    <div className="flex justify-center items-center h-screen">
                        <Formik
                            enableReinitialize
                            initialValues={{
                                name: carData?.name || "",
                                brand: carData?.brand || "",
                                year: carData?.year || 0,
                                price: carData?.price || 0,
                                description: carData?.description || "",
                                seats: carData?.seats || 0,
                                isAvailable: carData?.isAvailable || true,
                                offer: carData?.offer?.percentage || 0,
                            }}
                            validationSchema={updateCarSchema}
                            onSubmit={async (values) => {
                                const paylaod = new FormData();
                                paylaod.append("name", values.name);
                                paylaod.append("brand", values.brand);
                                paylaod.append("year", values.year as any);
                                paylaod.append("price", values.price as any);
                                paylaod.append(
                                    "description",
                                    values.description
                                );
                                paylaod.append("seats", values.seats as any);
                                paylaod.append(
                                    "isAvailable",
                                    values.isAvailable as any
                                );
                                paylaod.append(
                                    "offer",
                                    JSON.stringify({
                                        percentage: values.offer,
                                    })
                                );

                                try {
                                    const { data: ResponseData } =
                                        await axios.put<any>(
                                            "/cars/" + car,
                                            paylaod,
                                            {
                                                headers: {
                                                    "Content-Type":
                                                        "multipart/form-data",
                                                },
                                            }
                                        );
                                    setIsModalOpen(true);
                                    setCarData(ResponseData);
                                } catch (error: any) {
                                    console.log(error?.response?.data);
                                    setErrorMsg(error?.response?.data?.msg);
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
                                <Form className="w-96 p-4 border rounded-lg bg-white">
                                    <div>
                                        <div className="flex justify-between items-center w-full">
                                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 ">
                                                Update Car
                                            </h1>
                                        </div>
                                        <hr />
                                    </div>
                                    <div className="">
                                        <div className="p-2 w-1/2"></div>
                                        <div className="flex flex-col">
                                            <label className="leading-7 text-sm text-gray-600">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            {errors.name && touched.name ? (
                                                <div className="text-red-600">
                                                    {errors.name}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="brand"
                                                className="leading-7 text-sm text-gray-600"
                                            >
                                                Brand
                                            </label>
                                            <input
                                                type="text"
                                                name="brand"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.brand}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                            {errors.brand && touched.brand ? (
                                                <div className="text-red-600">
                                                    {errors.brand}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="year"
                                                className="leading-7 text-sm text-gray-600"
                                            >
                                                Year
                                            </label>
                                            <input
                                                type="number"
                                                name="year"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.year}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                            {errors.year && touched.year ? (
                                                <div className="text-red-600">
                                                    {errors.year}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="price"
                                                className="leading-7 text-sm text-gray-600"
                                            >
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.price}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                            {errors.price && touched.price ? (
                                                <div className="text-red-600">
                                                    {errors.price}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="description"
                                                className="leading-7 text-sm text-gray-600"
                                            >
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                name="description"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                            {errors.description &&
                                            touched.description ? (
                                                <div className="text-red-600">
                                                    {errors.description}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="seats"
                                                className="leading-7 text-sm text-gray-600"
                                            >
                                                Seats
                                            </label>
                                            <input
                                                type="number"
                                                name="seats"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.seats}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                            {errors.seats && touched.seats ? (
                                                <div className="text-red-600">
                                                    {errors.seats}
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="offer"
                                                className="leading-7 text-sm text-gray-600"
                                            >
                                                Set Offer(%)
                                            </label>
                                            <input
                                                type="number"
                                                max={100}
                                                name="offer"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.offer}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                            {errors.offer && touched.offer ? (
                                                <div className="text-red-600">
                                                    {errors.seats}
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="isAvailable"
                                                className="leading-7 text-sm text-gray-600"
                                            >
                                                Availability
                                            </label>
                                            <Switch
                                                checked={values.isAvailable}
                                                onChange={handleChange}
                                                name="isAvailable"
                                            />
                                            {errors.isAvailable &&
                                            touched.isAvailable ? (
                                                <div className="text-red-600">
                                                    {errors.isAvailable}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-4"
                                                type="submit"
                                            >
                                                Update
                                            </button>
                                            <p className="text-red-600">
                                                {errorMsg}
                                            </p>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        title="Success"
                        onClose={() => setIsModalOpen(false)}
                    >
                        <div className="flex flex-col items-center">
                            <p className="text-2xl font-semibold">
                                Car Updated Successfully
                            </p>
                            <Link
                                href="/cars"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-4"
                            >
                                View Cars
                            </Link>
                        </div>
                    </Modal>
                </MainLayout>
            </main>
        </>
    );
}

export default Edit;
