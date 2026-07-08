import { useState } from 'react';
import { useNavigate } from 'react-router';

import { authApi } from '../../modules/auth/auth.api';
import { useAuthStore } from '../../modules/auth/auth.store';
import styles from './AuthForm.module.scss';

const AuthForm = (): React.JSX.Element => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [authFormData, setAuthFormData] = useState({ email: '', password: '' });

  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (isLoginForm) {
      await authApi.signIn({
        email: authFormData.email,
        password: authFormData.password,
      });

      const currentUserResponse = await authApi.getCurrentUser();
      setUser(currentUserResponse.data);

      void navigate('/account');
      return;
    }

    const signUpResponse = await authApi.signUp({
      email: authFormData.email,
      password: authFormData.password,
    });

    setUser(signUpResponse.data);

    void navigate('/account');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.currentTarget;

    if (id === 'email') {
      setAuthFormData({ ...authFormData, email: value });
      return;
    }

    if (id === 'password') {
      setAuthFormData({ ...authFormData, password: value });
    }
  };

  const handleClick = (): void => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <form className={styles.form} onSubmit={(event) => void handleSubmit(event)}>
      <label className={styles['form__login-title']} htmlFor="email">
        Email
      </label>
      <input
        className={styles.form__input}
        id="email"
        onChange={handleChange}
        required
        type="email"
        value={authFormData.email}
      />
      <label className={styles['form__password-title']} htmlFor="password">
        Password
      </label>
      <input
        className={styles.form__input}
        id="password"
        onChange={handleChange}
        required
        type="password"
        value={authFormData.password}
      />
      <p className={styles['form__change-title']}>
        {isLoginForm ? 'New to ShopLife?' : 'Already a member?'}
      </p>
      <p className={styles['form__change-button']} onClick={handleClick}>
        {isLoginForm ? 'Click here to create a new account!' : 'Click here to sign in!'}
      </p>
      <button className={styles.form__button} type="submit">
        {isLoginForm ? 'Enter' : 'Sign Up'}
      </button>
    </form>
  );
};

export { AuthForm };
