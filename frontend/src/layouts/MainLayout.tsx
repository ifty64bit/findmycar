import Header from "@/components/Header";
import useAuth from "@/hooks/useAuth";
import React from "react";

type Props = {
    children: React.ReactNode;
};

function MainLayout({ children }: Props) {
    const isLoggedin = useAuth();
    return (
        <>
            <Header />
            <main className="w-4/5 mx-auto">{children}</main>
        </>
    );
}

export default MainLayout;
