import { AuthForm, Profile } from '../../components';
import { useAuthStore } from '../../modules/auth/auth.store';
import styles from './AccountPage.module.scss';

const AccountPage = (): React.JSX.Element => {
  const user = useAuthStore((state) => state.user);
  const isSessionLoading = useAuthStore((state) => state.isSessionLoading);

  return (
    <main className={styles['account-page']}>
      <div className={styles['account-page__body']}>
        {isSessionLoading ? null : user ? <Profile /> : <AuthForm />}
      </div>
    </main>
  );
};

export { AccountPage };
