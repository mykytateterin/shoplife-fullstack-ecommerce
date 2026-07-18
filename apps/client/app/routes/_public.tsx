import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { authApi } from '~/modules/auth/auth.api';
import { useAuthStore } from '~/modules/auth/auth.store';
import { categoriesApi } from '~/modules/categories/categories.api';
import { useCategoriesStore } from '~/modules/categories/categories.store';

import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';

const PublicLayout = (): React.JSX.Element => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setIsSessionLoading = useAuthStore((state) => state.setIsSessionLoading);

  const setCategories = useCategoriesStore((state) => state.setCategories);
  const clearCategories = useCategoriesStore((state) => state.clearCategories);
  const setAreCategoriesLoading = useCategoriesStore((state) => state.setAreCategoriesLoading);

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

    const loadCategories = async (): Promise<void> => {
      try {
        const getCategoriesResponse = await categoriesApi.getCategories();
        setCategories(getCategoriesResponse.data);
      } catch {
        clearCategories();
      } finally {
        setAreCategoriesLoading(false);
      }
    };

    void loadCurrentUser();
    void loadCategories();
  }, [
    clearUser,
    setUser,
    setIsSessionLoading,
    clearCategories,
    setCategories,
    setAreCategoriesLoading,
  ]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
