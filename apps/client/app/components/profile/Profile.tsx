import { useState } from 'react';

import { useAuthStore } from '../../modules/auth/auth.store';
import { AdminPanel } from '../admin-panel/AdminPanel';
import styles from './Profile.module.scss';

export const Profile = () => {
  const [isAdminPanel, setIsAdminPanel] = useState(false);
  const user = useAuthStore((state) => state.user);

  if (user === null) {
    return null;
  }

  const handleClick = () => {
    setIsAdminPanel(!isAdminPanel);
  };

  return (
    <div className={styles.profile}>
      <h2 className={styles.profile__email}>{user.email}</h2>
      {isAdminPanel && <AdminPanel />}
      <button className={styles.profile__button} onClick={handleClick} type="button">
        {isAdminPanel ? 'Switch to orders' : 'Switch to Admin panel'}
      </button>
    </div>
  );
};
