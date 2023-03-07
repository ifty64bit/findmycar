import useAuth from "@/hooks/useAuth";
import MainLayout from "@/layouts/MainLayout";
import { ICar } from "@/types";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { BsHeartFill } from "react-icons/bs";
import { Triangle } from "react-loader-spinner";
import axios from "../../../lib/axios";

type Props = {};

function Car({}: Props) {
    const router = useRouter();
    const { car } = router.query;
    const isLoggedin = useAuth();

    const [carData, setCarData] = useState<
        (ICar & { bookmarked: Boolean }) | undefined
    >();

    useEffect(() => {
        if (car) {
            (async () => {
                const { data } = await axios.get(`/cars/${car}`);
                setCarData(data);
            })();
        }
    }, [car]);

    async function handleBookmark() {
        try {
            const response = await axios.post(`/bookmarks`, {
                carId: carData?._id,
            });
            if (response.status === 200) {
                setCarData((prevState) => {
                    if (prevState) {
                        return {
                            ...prevState,
                            bookmarked: !prevState.bookmarked,
                        };
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return carData !== undefined ? (
        <>
            <Head>
                <title>Car</title>
            </Head>
            <main>
                <MainLayout>
                    <div className="w-4/5 mx-auto flex gap-8 mt-24 p-8">
                        <div>
                            <div>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_URL}/images/cars/${carData.images[0]}`}
                                    alt="car"
                                    width={500}
                                    height={500}
                                />
                            </div>
                            <div className="flex p-4">
                                {carData.images.map((image, index) => {
                                    return (
                                        <div key={index}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_URL}/images/cars/${image}`}
                                                alt="car"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* //Right Portion */}

                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {carData.brand}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {carData.name}
                            </h1>
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {carData.year}
                            </h2>
                            <p className="leading-relaxed">
                                {carData.description}
                            </p>
                            <hr className="my-4" />
                            <div className="flex gap-3">
                                <h3 className="font-semibold">
                                    {carData.seats} Seats
                                </h3>{" "}
                                |{" "}
                                <h3 className="font-semibold">
                                    {carData.views} Views
                                </h3>{" "}
                                |{" "}
                                <h3 className="font-semibold">
                                    {carData.isAvailable
                                        ? "Available"
                                        : "Not Available"}
                                </h3>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900 flex items-center">
                                    <TbCurrencyTaka /> {carData.price}
                                </span>
                                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Button
                                </button>
                                <button
                                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                                    onClick={handleBookmark}
                                >
                                    <BsHeartFill
                                        size={20}
                                        fill={
                                            carData.bookmarked ? "red" : "gray"
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </MainLayout>
            </main>
        </>
    ) : (
        <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass="w-screen h-screen flex justify-center items-center"
            visible={true}
        />
    );
}

export default Car;
