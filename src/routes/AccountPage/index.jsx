import { useUserStore } from '../../stores';

import { Profile, AuthForm } from '../../components';

import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  const isLogged = useUserStore((state) => state.isLogged);

  return (
    <main className={styles['account-page']}>
      {isLogged ? <Profile /> : <AuthForm />}
    </main>
  );
};
