import Link from "next/link";
import React from "react";

type Props = {};

function Hero({ }: Props) {
    const [search, setSearch] = React.useState<string>("");
    return (
        <section className="w-screen h-screen pt-28 flex justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-4xl font-bold">Find your car in a snap</h1>
                <div className="flex items-center">
                    <input
                        type="text"
                        className="border rounded-l p-1 h-12 text-xl"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link href={`/search?name=${search}`} className="bg-indigo-600 text-white rounded-r h-12 w-20 flex justify-center items-center outline-none outline-0 ring-0">
                        Search
                    </Link>
                </div>
                <div>
                    <h3 className="text-xl">
                        Want to list your own car?{" "}
                        <span className="text-blue-600">
                            <Link href={`/register`}>Signup Now</Link>
                        </span>{" "}
                    </h3>
                    <h3 className="text-xl">
                        Already Have An Account?{" "}
                        <span className="text-blue-600">
                            <Link href={`/login`}>Login Now</Link>
                        </span>{" "}
                    </h3>
                </div>
            </div>
        </section>
    );
}

export default Hero;
