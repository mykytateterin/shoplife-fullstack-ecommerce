import { Outlet } from "react-router";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { useUserStore } from '../stores';
import { getCategoriesStorage, setCategoriesStorage } from '~/lib/storage/catalog/categoryStorage';

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

  localStorage.getItem('users') ||
    localStorage.setItem('users', JSON.stringify(dummyUsers));

  Object.keys(getCategoriesStorage()).length ||
    setCategoriesStorage(dummyCategories);
}, []);


export default function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}