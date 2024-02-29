import React from 'react';
import { useTranslation } from 'react-i18next';

const Content = () => {
  const { t } = useTranslation();

  return (
    <div className="widget-content">
      <p>{t('hello_world')}</p>
    </div>
  );
};

export default Content;
