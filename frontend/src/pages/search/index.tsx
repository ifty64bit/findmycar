import Header from "@/components/Header";
import { ICar } from "@/types";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { useState, useEffect } from "react";
import axios from "../../lib/axios";
import Image from "next/image";
import { useRouter } from "next/router";
import Filter from "@/components/Filter";
import removeNullandEmpty from "../../lib/removeNullandEmpty";
import { Bars } from "react-loader-spinner";
import Link from "next/link";

type Props = {};

function Search({}: Props) {
    const router = useRouter();
    const [carList, setCarList] = useState<ICar[] | undefined>(undefined);
    const [seearchFilter, setSearchFilter] = useState({
        name: (router.query.name as string) || "",
        brand: (router.query.brand as string) || "",
        price: (router.query.price as string) || "",
        year: (router.query.year as string) || "",
    });

    useEffect(() => {
        console.log("seearchFilter", seearchFilter);

        const callAPI = async () => {
            const { data } = await axios.get("/cars/search", {
                params: removeNullandEmpty(seearchFilter),
            });
            setCarList([...data.data]);
        };
        const timmer = setTimeout(() => {
            callAPI();
        }, 300);
        return () => clearTimeout(timmer);
    }, [seearchFilter]);

    return (
        <>
            <Header />
            <main className="mt-28 w-4/5 mx-auto">
                <div>
                    <Filter
                        filters={seearchFilter}
                        setSearchFilter={setSearchFilter}
                    />
                </div>
                <hr className="mb-4" />
                <div>
                    {carList === undefined ? (
                        <Bars
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass="justify-center items-center"
                            visible={true}
                        />
                    ) : carList.length === 0 ? (
                        <p>No Car Found</p>
                    ) : (
                        carList.map((car, i) => (
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
                                                <TbCurrencyTaka /> {car.price}
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
            </main>
        </>
    );
}

export default Search;
