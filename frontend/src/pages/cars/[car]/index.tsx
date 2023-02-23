import useAuth from "@/hooks/useAuth";
import MainLayout from "@/layouts/MainLayout";
import { ICar } from "@/types";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import axios from "../../../lib/axios";

type Props = {};

function Car({}: Props) {
    const router = useRouter();
    const { car } = router.query;
    const isLoggedin = useAuth();

    const [carData, setCarData] = useState<ICar | undefined>();

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
            const { data } = await axios.post(`/bookmarks`, {
                carId: carData?._id,
            });
            console.log(data);
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
                    <div className="flex gap-8 mt-24 p-8">
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
                        <div>
                            <div className="flex flex-col justify-between items-start gap-4">
                                <h1 className="text-2xl font-semibold">
                                    {carData.name}
                                </h1>
                                <div className="flex gap-4">
                                    {isLoggedin ? (
                                        <button
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                                            onClick={handleBookmark}
                                        >
                                            Bookmark
                                        </button>
                                    ) : (
                                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">
                                            Login to Bookmark
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-gray-500">
                                                Price
                                            </span>
                                            <span className="text-gray-500">
                                                {carData.price}Tk
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-gray-500">
                                                Year
                                            </span>
                                            <span className="text-gray-500">
                                                {carData.year}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-gray-500">
                                                Brand
                                            </span>
                                            <span className="text-gray-500">
                                                {carData.brand}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-gray-500">
                                                Seat
                                            </span>
                                            <span className="text-gray-500">
                                                {carData.seats}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-xl">
                                            Description
                                        </h3>
                                        <p className="">
                                            {carData.description}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            Viewd by: {carData.views} People
                                        </h3>
                                    </div>
                                </div>
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
