import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useUserStore } from '../../stores';

import styles from './AuthForm.module.scss';
import {
  getUsersStorage,
  setUsersStorage,
} from '~/lib/storage/users/usersStorage';
import { setAuthCookies } from '~/lib/storage/cookies/authCookies';

export const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [authFormData, setAuthFormData] = useState({ login: '', password: '' });

  const generateToken = useUserStore((state) => state.generateToken);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedUsers = getUsersStorage();

    if (isLoginForm) {
      const parsedAccount = parsedUsers?.[authFormData.login];

      if (parsedAccount && authFormData.password === parsedAccount?.password)
        handleCookies(authFormData.login, parsedAccount.token);
    } else {
      const isLoginTaken = !!parsedUsers?.[authFormData.login];
      if (isLoginTaken) alert('Login is already taken!');
      else {
        const userData = {
          [authFormData.login]: {
            password: authFormData.password,
            token: generateToken(),
            isAdmin: false,
          },
        };

        handleCookies(authFormData.login, userData[authFormData.login].token);
        Object.assign(parsedUsers, userData);
        setUsersStorage(parsedUsers);
      }
    }
  };

  const handleCookies = (login, token) => {
    setAuthCookies(login, token);
    navigate('/account');
  };

  const handleChange = (e) => {
    if (e.target.id === 'login')
      setAuthFormData({ ...authFormData, login: e.target.value });
    else if (e.target.id === 'password')
      setAuthFormData({ ...authFormData, password: e.target.value });
  };

  const handleClick = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['form']}>
      <label htmlFor="login" className={styles['form__login-title']}>
        Login
      </label>
      <input
        type="text"
        id="login"
        value={authFormData.login}
        onChange={handleChange}
        className={styles['form__input']}
        required
      />
      <label htmlFor="password" className={styles['form__password-title']}>
        Password
      </label>
      <input
        type="password"
        id="password"
        value={authFormData.password}
        onChange={handleChange}
        className={styles['form__input']}
        required
      />
      <p className={styles['form__change-title']}>
        {isLoginForm ? 'New to ShopLife?' : 'Already a member?'}
      </p>
      <p onClick={handleClick} className={styles['form__change-button']}>
        {isLoginForm
          ? 'Click here to create a new account!'
          : 'Click here to sign in!'}
      </p>
      <button type="submit" className={styles['form__button']}>
        {isLoginForm ? 'Enter' : 'Sign Up'}
      </button>
    </form>
  );
};
