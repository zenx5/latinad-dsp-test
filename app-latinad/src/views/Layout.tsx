import { useState } from "react";
import { Button } from "antd";
import { Link, Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux'
import { useLoadScript, type Libraries } from "@react-google-maps/api"
import Isotipo from "../assets/latinad.isotipo.svg?react"
import Imagotipo from "../assets/latinad.imagotipo.svg?react"
import { availableLangs, defaultLang } from "../translates/langs";
import { ROUTES } from "../tools/constants";
import { RootState } from '../tools/store'
import CartDetail from "../components/CartDetail";

const libraries = [ "places", "geometry", "drawing", "visualization" ] as Libraries

export default function Layout() {
    const location = useLocation()
    const { cart, query } = useSelector.withTypes<RootState>()( state => state )
    const { i18n, t } = useTranslation()
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

    const numberDays = 10
    const currency = cart.items?.at(0)?.price_currency ?? 'USD'
    const total = cart.items.map( ({price_per_day}) => price_per_day*numberDays ).reduce( (sum, price) => sum+price ,0)

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
        <footer className="bg-white bg-shadow-slate sm:flex flex-row items-center justify-between py-4 px-6 h-20 hidden absolute bottom-0 w-full max-w-4xl mx-auto">
            { cart.items.length>0 && <CartDetail quantity={cart.items.length} currency={currency} total={Number(total.toFixed(2))} />}
            { (location.pathname===ROUTES.CART && cart.items.length>0) && <Link to={ROUTES.CHECKOUT} className="bg-primary text-white py-2 px-4 rounded font-bold">{t('goto_checkout')}</Link>}
            <span>
                { (location.pathname===ROUTES.HOME && cart.items.length>0) && <Link to={ROUTES.CART} className="text-primary underline">{t('goto_cart')}</Link>}
                { (location.pathname===ROUTES.CART || location.pathname===ROUTES.CHECKOUT) && <Link to={ROUTES.HOME} className="text-primary underline">{t('goto_home')}</Link>}
            </span>
        </footer>
    </div>
}