import MainLayout from "@/layouts/MainLayout";
import { ICar } from "@/types";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import axios from "../../lib/axios";

type Props = {
    carList: ICar[];
};

function Offered({ carList }: Props) {
    return (
        <>
            <Head>
                <title>Offered Cars</title>
            </Head>
            <MainLayout>
                <div className="mt-24 p-8">
                    {carList.length === 0 ? (
                        <p>No Car Found</p>
                    ) : (
                        carList.map((car: ICar, i) => (
                            <div
                                key={i}
                                className="flex flex-wrap mb-4 rounded-lg hover:bg-gray-200"
                            >
                                <div className="p-4 lg:w-1/2">
                                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                        <Image
                                            alt="team"
                                            className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                                            src={`${process.env.NEXT_PUBLIC_URL}/images/cars/${car.images[0]}`}
                                            width={200}
                                            height={200}
                                        />
                                        <div className="flex-grow sm:pl-8">
                                            <h2 className="title-font font-medium text-lg text-gray-900">
                                                {car.name}
                                            </h2>
                                            <h3 className="text-gray-500 mb-3">
                                                {car.brand} | {car.year}
                                            </h3>
                                            <p className="mb-4">
                                                {car.description}
                                            </p>
                                            <h3 className="text-black font-semibold mb-3 flex items-center">
                                                <TbCurrencyTaka />{" "}
                                                <span className="line-through">
                                                    {car.price}
                                                </span>
                                                <span className="ml-2">
                                                    {car.price -
                                                        car.price *
                                                            (car?.offer
                                                                ?.percentage! /
                                                                100)}
                                                </span>
                                                <span className="ml-2">
                                                    (Saved{" "}
                                                    {car.offer?.percentage!}% )
                                                </span>
                                            </h3>
                                            <span className="inline-flex">
                                                <Link
                                                    href={`/cars/${car._id}`}
                                                    className="inline-flex items-center bg-indigo-600 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-500 rounded text-base mt-4 md:mt-0"
                                                >
                                                    View{" "}
                                                    <span>
                                                        <MdKeyboardArrowRight />
                                                    </span>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </MainLayout>
        </>
    );
}

export async function getServerSideProps(context: GetServerSideProps) {
    try {
        const { data } = await axios.get("/cars/offered");
        console.log(data);
        return {
            props: {
                carList: data.cars,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                carList: [],
            },
        };
    }
}

export default Offered;
