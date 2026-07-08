import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router';

import accountIcon from '../../assets/images/icons/account-icon.svg';
import closeHamburgerIcon from '../../assets/images/icons/close-hamburger-menu-icon.svg';
import openHamburgerIcon from '../../assets/images/icons/open-hamburger-menu-icon.svg';
import { getCategoriesStorage } from '../../lib/storage/catalog/categoryStorage';
import logo from '../../logo.svg';
import styles from './Header.module.scss';

const Header = (): React.JSX.Element => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const navCategories = getCategoriesStorage();

  const handleHamburger = (): void => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__body}>
        <Link className={styles.header__logo} to="/">
          <img alt="ShopLife logo" src={logo} />
        </Link>
        <motion.div
          animate={isHamburgerOpen ? { display: 'flex', x: '-100%' } : { display: 'none', x: 0 }}
          className={styles.header__navigation}
          transition={{ type: 'tween' }}
        >
          <nav className={styles['header__navigation-body']}>
            {Object.entries(navCategories).map(([name, category]) => {
              return (
                <Link
                  className={styles['header__navigation-item']}
                  key={category.url}
                  to={category.url}
                >
                  {name.toUpperCase()}
                </Link>
              );
            })}
          </nav>
          <img
            alt="Button to close the navigation slider"
            className={styles['header__close-hamburger']}
            onClick={handleHamburger}
            src={closeHamburgerIcon}
          />
        </motion.div>
        <Link className={styles.header__account} to="/account">
          <img alt="Button to access your account" src={accountIcon} />
        </Link>
        <img
          alt="Button to open the navigation slider"
          className={styles['header__open-hamburger']}
          onClick={handleHamburger}
          src={openHamburgerIcon}
        />
      </div>
    </header>
  );
};

export { Header };
