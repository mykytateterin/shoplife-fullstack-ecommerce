import { Outlet } from 'react-router';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';

import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { useUserStore } from '../stores';
import {
  getCategoriesStorage,
  setCategoriesStorage,
} from '~/lib/storage/catalog/categoryStorage';
import {
  getUsersStorage,
  setUsersStorage,
} from '~/lib/storage/users/usersStorage';

export default function PublicLayout() {
  const loginCheck = useUserStore((state) => state.loginCheck);
  const generateToken = useUserStore((state) => state.generateToken);
  const location = useLocation();

  useEffect(() => {
    loginCheck();
  }, [loginCheck, location]);

  useEffect(() => {
    const dummyUsers = {
      dummyAdmin: {
        password: 'admin123',
        token: generateToken(),
        isAdmin: true,
      },
    };

    const dummyCategories = {
      men: {
        url: '/men',
      },
      women: {
        url: '/women',
      },
      kids: {
        url: '/kids',
      },
      sale: {
        url: '/sale',
      },
    };

    if (Object.keys(getUsersStorage()).length === 0) {
      setUsersStorage(dummyUsers);
    }

    if (Object.keys(getCategoriesStorage()).length === 0) {
      setCategoriesStorage(dummyCategories);
    }
  }, [generateToken]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
