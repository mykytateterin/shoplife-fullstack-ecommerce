import logo from '../../logo.svg';
import styles from './Footer.module.scss';

const Footer = (): React.JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__body}>
        <img alt="ShopLife logo" className={styles.footer__logo} src={logo} />
        <p className={styles.footer__info}>Made with ❤️ by Mykyta Teterin</p>
      </div>
    </footer>
  );
};

export { Footer };
