import styles from './Profile.module.scss';
import { useState } from 'react';
import { AdminPanel } from '../admin-panel/AdminPanel';
import { getAuthCookies } from '../../lib/storage/cookies/authCookies';

export const Profile = () => {
  const [isAdminPanel, setIsAdminPanel] = useState(false);
  const { login } = getAuthCookies();

  const handleClick = () => {
    setIsAdminPanel(!isAdminPanel);
  };

  return (
    <div className={styles['profile']}>
      <h2 className={styles['profile__login']}>{login}</h2>
      {isAdminPanel && <AdminPanel />}
      <button
        type="button"
        onClick={handleClick}
        className={styles['profile__button']}
      >
        {isAdminPanel ? 'Switch to orders' : 'Switch to Admin panel'}
      </button>
    </div>
  );
};
