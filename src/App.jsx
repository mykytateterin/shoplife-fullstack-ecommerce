import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { useUserStore } from './stores';

import { Header, Footer } from './components';

import { AccountPage, ErrorPage, HomePage } from './routes';

function App() {
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

    localStorage.getItem('categories') ||
      localStorage.setItem('categories', JSON.stringify(dummyCategories));
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
