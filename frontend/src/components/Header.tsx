import React from "react";
import { Pacifico } from "@next/font/google";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

type Props = {};

const pacifico = Pacifico({
    weight: ["400"],
    subsets: ["latin"],
});

function Header({}: Props) {
    const auth = useAuth();
    return (
        <header className="text-black bg-indigo-600 w-screen h-36 md:h-24 flex justify-center items-center fixed top-0">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
                    <span className={`ml-3 text-3xl ${pacifico.className}`}>
                        FindMyCar
                    </span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link href={`/`} className="mr-5 hover:text-gray-900">
                        Home
                    </Link>
                    <Link href={`/about`} className="mr-5 hover:text-gray-900">
                        About
                    </Link>
                    <Link
                        href={`/contact`}
                        className="mr-5 hover:text-gray-900"
                    >
                        Contact US
                    </Link>
                    <Link
                        href={`/privacy`}
                        className="mr-5 hover:text-gray-900"
                    >
                        Privacy Policy
                    </Link>
                </nav>
                {auth == null ? (
                    ""
                ) : auth ? (
                    <button className="inline-flex items-center bg-red-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-red-500 rounded text-base mt-4 md:mt-0">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            href={`/login`}
                            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                        >
                            Login
                        </Link>
                        <Link
                            href={`/signup`}
                            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                        >
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
