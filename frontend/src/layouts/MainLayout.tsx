import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";

type Props = {
    children: React.ReactNode;
};

function MainLayout({ children }: Props) {
    const isLoggedin = useAuth();
    return (
        <>
            <header>
                <header className="bg-indigo-600 flex px-4 justify-between items-center w-screen h-24 fixed top-0">
                    <Link href={`/cars`} className="text-3xl font-bold">
                        Find My Car
                    </Link>
                    <div className="flex gap-8">
                        {isLoggedin && (
                            <Link
                                href={`/dashboard`}
                                className="border px-4 py-2 rounded-lg border-gray-500 font-semibold hover:bg-white hover:text-black transition-all duration-300"
                            >
                                Dashboard
                            </Link>
                        )}
                        <Link
                            href={`/cars`}
                            className="border px-4 py-2 rounded-lg border-gray-500 font-semibold hover:bg-white hover:text-black transition-all duration-300"
                        >
                            View Cars
                        </Link>
                        {isLoggedin && (
                            <>
                                <Link
                                    href={`/cars/create`}
                                    className="border px-4 py-2 rounded-lg border-gray-500 font-semibold hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    Add Car
                                </Link>
                                <Link
                                    href={`/profile`}
                                    className="border px-4 py-2 rounded-lg border-gray-500 font-semibold hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    Profile
                                </Link>
                            </>
                        )}
                        {!isLoggedin && (
                            <>
                                <Link
                                    href={`/login`}
                                    className="border px-4 py-2 rounded-lg border-gray-500 font-semibold hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={`/signup`}
                                    className="border px-4 py-2 rounded-lg border-gray-500 font-semibold hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </header>
            </header>
            {children}
        </>
    );
}

export default MainLayout;
