import errorIcon from '../../assets/images/icons/error-page-icon.svg';

import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  return (
    <main className={styles['error-page']}>
      <div className={styles['error-page__body']}>
        <h1 className={styles['error-page__title']}>Page not found...</h1>
        <img
          src={errorIcon}
          alt="Error 404 icon (page not found)"
          className={styles['error-page__image']}
        />
      </div>
    </main>
  );
};
