import FormSearch from '../components/FormSearch/FormSearch'
import '../translates/i18n'
import { useTranslation } from 'react-i18next'

export default function Main() {
    const { t } = useTranslation()

    return <main className="sm:p-4 p-0">
        <h1>{t('title')}</h1>
        <FormSearch />
    </main>
}