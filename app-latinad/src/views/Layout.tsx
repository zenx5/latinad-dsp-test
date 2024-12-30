import { Button } from "antd";
import Isotipo from "../assets/latinad.isotipo.svg?react"
import Imagotipo from "../assets/latinad.imagotipo.svg?react"
import { Outlet } from "react-router";

export default function Layout() {


    return <div className="w-screen h-screen m-0 p-0  max-w-4xl mx-auto bg-slate-300">
        <header className="bg-white bg-shadow-slate flex flex-row justify-between py-4 px-6">
            <span className="flex sm:flex-row flex-col sm:items-start items-center gap-2 h-10">
                <span className="w-10 h-10">
                    <Isotipo />
                </span>
                <span className="w-36 h-10">
                    <Imagotipo />
                </span>
            </span>
            <Button type="primary" className="rounded-full">Es</Button>
        </header>
        <Outlet />
        <footer className="bg-white bg-shadow-slate flex flex-row justify-between py-4 px-6 h-20 absolute bottom-0 w-full max-w-4xl mx-auto"></footer>
    </div>
}