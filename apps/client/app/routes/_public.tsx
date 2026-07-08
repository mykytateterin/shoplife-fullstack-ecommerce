import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { getCategoriesStorage, setCategoriesStorage } from '../lib/storage/catalog/categoryStorage';

export default function PublicLayout() {
  useEffect(() => {
    const dummyCategories = {
      kids: {
        url: '/kids',
      },
      men: {
        url: '/men',
      },
      sale: {
        url: '/sale',
      },
      women: {
        url: '/women',
      },
    };

    if (Object.keys(getCategoriesStorage()).length === 0) {
      setCategoriesStorage(dummyCategories);
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
