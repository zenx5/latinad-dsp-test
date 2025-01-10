import { useState } from "react";
import { Button } from "antd";
import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import { useLoadScript, type Libraries } from "@react-google-maps/api"
import Isotipo from "../assets/latinad.isotipo.svg?react"
import Imagotipo from "../assets/latinad.imagotipo.svg?react"
import { availableLangs, defaultLang } from "../translates/langs";


const libraries = [ "places", "geometry", "drawing", "visualization" ] as Libraries

export default function Layout() {
    const { i18n } = useTranslation()
    const [currentLang, setCurrentLang] = useState( availableLangs.indexOf(defaultLang) )

    const handleChangeLang = () => {
        const nextLang = currentLang===availableLangs.length-1 ? 0 : currentLang + 1
        setCurrentLang( nextLang )
        i18n.changeLanguage( availableLangs[nextLang] )
    }

    const { isLoaded } = useLoadScript({
        nonce:'mi-app',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
        libraries
    });

    return <div className="w-screen h-screen m-0 p-0  max-w-4xl mx-auto">
        <header className="bg-white bg-shadow-slate flex flex-row justify-between py-4 px-6">
            <span className="flex sm:flex-row flex-col sm:items-start items-center sm:gap-2 gap-1 h-10">
                <span className="sm:w-10 sm:h-10 w-5 h-5">
                    <Isotipo />
                </span>
                <span className="sm:w-36 sm:h-10 w-20 h-5">
                    <Imagotipo />
                </span>
            </span>
            <Button type="primary" onClick={handleChangeLang} className="rounded-full uppercase">{ availableLangs[currentLang] }</Button>
        </header>
        <main className="layout-main-root">
            { isLoaded && <Outlet />}
        </main>
        <footer className="bg-white bg-shadow-slate sm:flex flex-row justify-between py-4 px-6 h-20 hidden absolute bottom-0 w-full max-w-4xl mx-auto"></footer>
    </div>
}