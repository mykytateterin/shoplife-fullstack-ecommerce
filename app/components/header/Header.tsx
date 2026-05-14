import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

import logo from '../../logo.svg';
import openHamburgerIcon from '../../assets/images/icons/open-hamburger-menu-icon.svg';
import closeHamburgerIcon from '../../assets/images/icons/close-hamburger-menu-icon.svg';
import accountIcon from '../../assets/images/icons/account-icon.svg';

import styles from './Header.module.scss';
import { getCategoriesStorage } from '~/lib/storage/catalog/categoryStorage';

export const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const navCategories = getCategoriesStorage();

  const handleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <header className={styles['header']}>
      <div className={styles['header__body']}>
        <Link to="/" className={styles['header__logo']}>
          <img src={logo} alt="ShopLife logo" />
        </Link>
        <motion.div
          animate={
            isHamburgerOpen
              ? { x: '-100%', display: 'flex' }
              : { x: 0, display: 'none' }
          }
          transition={{ type: 'tween' }}
          className={styles['header__navigation']}
        >
          <nav className={styles['header__navigation-body']}>
            {Object.keys(navCategories || {}).map((key) => {
              return (
                <Link
                  key={navCategories[key].url}
                  to={navCategories[key].url}
                  className={styles['header__navigation-item']}
                >
                  {key.toUpperCase()}
                </Link>
              );
            })}
          </nav>
          <img
            src={closeHamburgerIcon}
            alt="Button to close the navigation slider"
            onClick={handleHamburger}
            className={styles['header__close-hamburger']}
          />
        </motion.div>
        <Link to="/account" className={styles['header__account']}>
          <img src={accountIcon} alt="Button to access your account" />
        </Link>
        <img
          src={openHamburgerIcon}
          alt="Button to open the navigation slider"
          onClick={handleHamburger}
          className={styles['header__open-hamburger']}
        />
      </div>
    </header>
  );
};
