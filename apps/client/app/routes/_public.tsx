import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { getCategoriesStorage, setCategoriesStorage } from '../lib/storage/catalog/categoryStorage';
import { authApi } from '../modules/auth/auth.api';
import { useAuthStore } from '../modules/auth/auth.store';

const PublicLayout = (): React.JSX.Element => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setIsSessionLoading = useAuthStore((state) => state.setIsSessionLoading);

  useEffect(() => {
    const loadCurrentUser = async (): Promise<void> => {
      try {
        const currentUserResponse = await authApi.getCurrentUser();
        setUser(currentUserResponse.data);
      } catch {
        clearUser();
      } finally {
        setIsSessionLoading(false);
      }
    };

    void loadCurrentUser();
  }, [clearUser, setUser, setIsSessionLoading]);

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
};

export default PublicLayout;
