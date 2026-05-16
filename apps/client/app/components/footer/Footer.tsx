import styles from './Footer.module.scss';
import logo from '../../logo.svg';

export const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__body']}>
        <img src={logo} alt="ShopLife logo" className={styles['footer__logo']} />
        <p className={styles['footer__info']}>Made with ❤️ by Mykyta Teterin</p>
      </div>
    </footer>
  );
};
