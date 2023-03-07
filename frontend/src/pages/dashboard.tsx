import useAuth from "@/hooks/useAuth";
import MainLayout from "@/layouts/MainLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import axios from "../lib/axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ICar, ISearch } from "@/types";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Most Viewd Cars",
        },
    },
};

type Props = {};

function Dashboard({}: Props) {
    const router = useRouter();
    const isLoggedIn = useAuth();

    const [carData, setCarData] = useState<ICar[] | undefined>();
    const [myCar, setMyCar] = useState<
        { cars: ICar[]; count: number } | undefined
    >();
    const [searchHistory, setSearchHistory] = useState<ISearch[]>([]);

    if (isLoggedIn === false) router.push("/login");

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/statistics`);
                setCarData(data.cars);
            } catch (error) {
                console.log(error);
            }
        })();

        (async () => {
            try {
                const { data } = await axios.get(`/cars/my`);
                console.log(data);

                setMyCar(data);
            } catch (error) {
                console.log(error);
            }
        })();

        (async () => {
            try {
                const { data } = await axios.get(`/users/search-history`);
                setSearchHistory(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const data = {
        labels: carData?.map((car: ICar) => car.name),
        datasets: [
            {
                label: "Dataset 1",
                data: carData?.map((car: ICar) => car.views),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    async function deleteAllHistory() {
        try {
            const { data } = await axios.delete(`/users/search-history-all`);
            setSearchHistory([]);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteOneHistory(id: string) {
        try {
            const { data } = await axios.delete(`/users/search-history/${id}`);
            setSearchHistory(
                searchHistory.filter((search: ISearch) => search._id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    }

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
                <title>Dashboard</title>
            </Head>
            <main>
                <MainLayout>
                    <div className="mt-24 p-4 flex gap-4">
                        <div className="w-3/4">
                            <Bar options={options} data={data} />
                        </div>

                        <div className="border p-2">
                            <div className="w-56 flex justify-between items-center">
                                <h3 className="font-semibold">Recent Seaech</h3>
                                <button
                                    className="inline-flex items-center bg-red-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-red-500 rounded text-base mt-4 md:mt-0"
                                    onClick={deleteAllHistory}
                                >
                                    Delete All
                                </button>
                            </div>
                            <hr className="my-4" />
                            <ul>
                                {searchHistory.length == 0 ? (
                                    <p>Empty History</p>
                                ) : (
                                    searchHistory?.map((search: ISearch) => {
                                        return (
                                            <li
                                                key={search._id}
                                                className="flex justify-between items-center border-b-2 border-gray-200 py-2"
                                            >
                                                {search.query}{" "}
                                                <IoMdClose
                                                    color="red"
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        deleteOneHistory(
                                                            search._id
                                                        )
                                                    }
                                                />
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="flex gap-8 flex-wrap mt-24 p-8">
                        {myCar?.cars?.map((car: ICar) => {
                            return (
                                <div key={car._id}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={`${process.env.NEXT_PUBLIC_URL}/images/cars/${car.images[0]}`}
                                            title="green iguana"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {car.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {car.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link
                                                href={`/cars/${car._id}/edit`}
                                            >
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    Edit
                                                    <MdArrowRightAlt
                                                        size={20}
                                                    />
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </MainLayout>
            </main>
        </>
    );
}

export default Dashboard;
