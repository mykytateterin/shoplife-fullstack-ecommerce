import { useState } from 'react';
import { useNavigate } from 'react-router';

import { authApi } from '../../modules/auth/auth.api';
import { useAuthStore } from '../../modules/auth/auth.store';
import styles from './AuthForm.module.scss';

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [authFormData, setAuthFormData] = useState({ email: '', password: '' });
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginForm) {
      await authApi.signIn({
        email: authFormData.email,
        password: authFormData.password,
      });

      const currentUserResponse = await authApi.getCurrentUser();
      setUser(currentUserResponse.data);

      await navigate('/account');
      return;
    } else {
      const signUpResponse = await authApi.signUp({
        email: authFormData.email,
        password: authFormData.password,
      });

      setUser(signUpResponse.data);
    }

    await navigate('/account');
  };

  const handleChange = (e) => {
    if (e.target.id === 'email') setAuthFormData({ ...authFormData, email: e.target.value });
    else if (e.target.id === 'password')
      setAuthFormData({ ...authFormData, password: e.target.value });
  };

  const handleClick = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
