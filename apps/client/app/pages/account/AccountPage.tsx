import { AuthForm, Profile } from '../../components';
import { useAuthStore } from '../../modules/auth/auth.store';
import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  const user = useAuthStore((state) => state.user);
  const isSessionLoading = useAuthStore((state) => state.isSessionLoading);

  if (isSessionLoading) {
    return <main className={styles['account-page']} />;
  }

  return <main className={styles['account-page']}>{user ? <Profile /> : <AuthForm />}</main>;
};
