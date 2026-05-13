import { Outlet } from "react-router";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { useUserStore } from '../stores';
import { getCategoriesStorage, setCategoriesStorage } from '~/lib/storage/catalog/categoryStorage';
import { getUsersStorage, setUsersStorage } from '~/lib/storage/users/usersStorage';

export default function PublicLayout() {
  const loginCheck = useUserStore((state) => state.loginCheck);
  const generateToken = useUserStore((state) => state.generateToken);
  const location = useLocation();

  useEffect(() => {
    loginCheck();
  }, [location]);

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

    Object.keys(getUsersStorage()).length ||
      setUsersStorage(dummyUsers);

    Object.keys(getCategoriesStorage()).length ||
      setCategoriesStorage(dummyCategories);
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}