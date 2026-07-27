import errorIcon from '../../assets/images/icons/error-page-icon.svg';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = (): React.JSX.Element => {
  return (
    <main className={styles['not-found-page']}>
      <div className={styles['not-found-page__body']}>
        <h1 className={styles['not-found-page__title']}>Page not found...</h1>
        <img
          alt="Error 404 icon (page not found)"
          className={styles['not-found-page__image']}
          src={errorIcon}
        />
      </div>
    </main>
  );
};

export { NotFoundPage };
