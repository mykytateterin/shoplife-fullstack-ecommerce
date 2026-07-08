import styles from './HomePage.module.scss';

const HomePage = (): React.JSX.Element => {
  return (
    <main className={styles['home-page']}>
      <div className={styles['home-page__body']} />
    </main>
  );
};

export { HomePage };
