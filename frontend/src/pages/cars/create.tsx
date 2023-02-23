import useAuth from "@/hooks/useAuth";
import MainLayout from "@/layouts/MainLayout";
import Head from "next/head";
import { useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Formik, Form } from "formik";
import Switch from "@mui/material/Switch";
import axios from "@/lib/axios";
import Modal from "@/components/Modal";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {};

const CreateCarSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    brand: Yup.string().required("Brand Required"),
    year: Yup.number().required("Year Required"),
    price: Yup.number().required("Price Required"),
    description: Yup.string().required("Description Required"),
    seats: Yup.number().required("Seats Required"),
    isAvailable: Yup.boolean().required("Availability Required"),
    images: Yup.mixed().required("Image Required"),
});

function Create({}: Props) {
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const router = useRouter();
    const isLoggedIn = useAuth();

    if (isLoggedIn === false) router.push("/login");

    return isLoggedIn === null ? (
        <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass="w-screen h-screen flex justify-center items-center"
            visible={true}
        />
    ) : (
        <>
            <Head>
                <title>Create Car</title>
            </Head>

            <MainLayout>
                <div className="flex justify-center items-center h-screen">
                    <Formik
                        initialValues={{
                            name: "",
                            brand: "",
                            year: "",
                            price: "",
                            description: "",
                            seats: "",
                            isAvailable: true,
                            images: [],
                        }}
                        validationSchema={CreateCarSchema}
                        onSubmit={async (values) => {
                            const paylaod = new FormData();
                            paylaod.append("name", values.name);
                            paylaod.append("brand", values.brand);
                            paylaod.append("year", values.year);
                            paylaod.append("price", values.price);
                            paylaod.append("description", values.description);
                            paylaod.append("seats", values.seats);
                            paylaod.append(
                                "isAvailable",
                                values.isAvailable as any
                            );
                            //upload all images
                            for (let i = 0; i < values.images.length; i++) {
                                paylaod.append("images", values.images[i]);
                            }
                            try {
                                const { data: ResponseData } =
                                    await axios.post<any>("/cars", paylaod, {
                                        headers: {
                                            "Content-Type":
                                                "multipart/form-data",
                                        },
                                    });
                                setIsModalOpen(true);
                                console.log(ResponseData);
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
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">
                                            Create Car
                                        </h3>
                                    </div>
                                    <hr />
                                </div>
                                <div className="mt-2">
                                    <div className="flex flex-col">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            className="border"
                                        />
                                        {errors.name && touched.name ? (
                                            <div className="text-red-600">
                                                {errors.name}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="brand">Brand</label>
                                        <input
                                            type="text"
                                            name="brand"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.brand}
                                            className="border"
                                        />
                                        {errors.brand && touched.brand ? (
                                            <div className="text-red-600">
                                                {errors.brand}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="year">Year</label>
                                        <input
                                            type="number"
                                            name="year"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.year}
                                            className="border"
                                        />
                                        {errors.year && touched.year ? (
                                            <div className="text-red-600">
                                                {errors.year}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="price">Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.price}
                                            className="border"
                                        />
                                        {errors.price && touched.price ? (
                                            <div className="text-red-600">
                                                {errors.price}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            name="description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                            className="border"
                                        />
                                        {errors.description &&
                                        touched.description ? (
                                            <div className="text-red-600">
                                                {errors.description}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="seats">Seats</label>
                                        <input
                                            type="number"
                                            name="seats"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.seats}
                                            className="border"
                                        />
                                        {errors.seats && touched.seats ? (
                                            <div className="text-red-600">
                                                {errors.seats}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="image">Image</label>
                                        <input
                                            type="file"
                                            name="images"
                                            multiple
                                            accept="image/*"
                                            onChange={(event) => {
                                                setFieldValue(
                                                    "images",
                                                    event.currentTarget.files
                                                );
                                            }}
                                            onBlur={handleBlur}
                                            className="border"
                                        />
                                        {errors.images && touched.images ? (
                                            <div className="text-red-600">
                                                {errors.images}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="flex gap-2">
                                        {values.images &&
                                            Array.from(values.images).map(
                                                (file: any, i: number) => (
                                                    <img
                                                        key={i}
                                                        src={URL.createObjectURL(
                                                            file
                                                        )}
                                                        alt={file.name}
                                                        className="w-20 h-20 object-cover"
                                                    />
                                                )
                                            )}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="isAvailable">
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
                                            Add Car
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
                            Car Added Successfully
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
        </>
    );
}

export default Create;
