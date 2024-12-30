import '../translates/i18n'
import { useTranslation } from 'react-i18next'

export default function Main() {
    const { t } = useTranslation()

    return <main>{t('title')}</main>
}