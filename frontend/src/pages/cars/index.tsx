import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import axios from "../../lib/axios";
import type { ICar } from "@/types";
import Head from "next/head";
import { MdArrowRightAlt } from "react-icons/md";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

type Props = {};

function Cars({}: Props) {
    const [cars, setCars] = useState<ICar[]>([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get<any>(`/cars/my`);
            setCars(data.cars);
            setCount(data.count);
        })();
    }, []);
    return (
        <>
            <Head>
                <title>My Cars</title>
            </Head>
            <MainLayout>
                <div className="w-4/5 mx-auto flex gap-8 flex-wrap mt-24 p-8">
                    {cars?.length &&
                        cars?.map((car: ICar) => {
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
                                            <Link href={`/cars/${car._id}`}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    View
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
                <div className="w-4/5 mx-auto">
                    <Pagination
                        count={count / 5}
                        color="primary"
                        page={0}
                        onChange={(e, v) => console.log(v)}
                    />
                </div>
            </MainLayout>
        </>
    );
}

export default Cars;
