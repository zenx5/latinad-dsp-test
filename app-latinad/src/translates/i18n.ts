import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { es, en } from "./langs";

const resources = {
    es, en
}

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng:'en',
        interpolation:{
            escapeValue: false
        }
    })

export default i18next