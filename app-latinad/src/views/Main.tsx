import FormSearch from '../components/FormSearch/FormSearch'
import '../translates/i18n'
import { useTranslation } from 'react-i18next'

export default function Main() {
    const { t } = useTranslation()

    return <div className="w-full h-full sm:p-4 p-0 flex flex-row items-center justify-center">
        <div className="flex sm:flex-row flex-col-reverse sm:justify-between justify-start gap-20 items-start sm:h-fit h-full w-full">
            <FormSearch />
            <div className="sm:w-1/2 w-full text-white ">
                <h1 className="text-center text-3xl font-bold mb-10">{t('title-action')}</h1>
                <p className="text-xl text-center sm:text-left">{t('copy-action')}</p>
            </div>
        </div>
    </div>
}