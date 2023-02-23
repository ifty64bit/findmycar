import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

type Props = {};

function Header({}: Props) {
    return (
        <header className="bg-indigo-600 flex justify-center items-center w-screen h-24 fixed top-0">
            <h5 className="text-5xl ">Find My Car</h5>
        </header>
    );
}

export default Header;
