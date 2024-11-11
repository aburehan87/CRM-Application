'use client'

import React from "react"
import { usePathname } from "next/navigation"
import Navbar from "../components/navbar";

export default function NavbarWrapper(){
    const pathName = usePathname();

    if(pathName === '/login'  || pathName === '/') {return null};
    return <Navbar/>

}  