import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {

  const { t } = useTranslation();

  return (
    <div>
      <h1 className="w-50 text-center m-5">{t('notFoundPage.notFoundText')}<Link to="/">{t('notFoundPage.homeLink')}</Link></h1>
    </div>
  )
}

export {NotFoundPage}
