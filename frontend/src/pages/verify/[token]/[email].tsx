import Header from "@/components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "../../../lib/axios";

type Props = {};

function Verify({}: Props) {
    const router = useRouter();
    const { token, email } = router.query;

    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (token && email) {
            axios
                .get(`/auth/verify/${token}/${email}`)
                .then((res) => {
                    if (res.status === 200) {
                        setVerified(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [token, email, router]);
    return (
        <>
            <Head>
                <title>Verify</title>
            </Head>
            <main className="mt-28">
                <Header />
                <section className="flex justify-center items-center">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <h1 className="text-4xl font-bold">
                            {verified
                                ? "Account Verified"
                                : "Verifying Account"}
                        </h1>
                        <div className="flex items-center">
                            {verified ? (
                                <button
                                    className="bg-indigo-600 text-white rounded-r h-12 p-1 px-4 outline-none outline-0 ring-0"
                                    onClick={() => router.push("/login")}
                                >
                                    Login
                                </button>
                            ) : (
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Verify;
