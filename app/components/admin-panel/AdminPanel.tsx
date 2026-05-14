import { useState } from 'react';

import styles from './AdminPanel.module.scss';

import { CategoriesPanel } from '..';
// import ProductsPanel from './ProductsPanel';
// import PromotionsPanel from './PromotionsPanel';
// import UsersPanel from './UsersPanel';

export const AdminPanel = () => {
  const [currentPanel, setCurrentPanel] = useState('');

  const handleClick = (e) => {
    setCurrentPanel(e.target.innerText);
  };

  const panelSwitch = () => {
    switch (currentPanel) {
      case 'Categories':
        return <CategoriesPanel />;
      case 'Products':
        // return <ProductsPanel />;
        break;
      case 'Promotions':
        // return <PromotionsPanel />;
        break;
      case 'Users':
        // return <UsersPanel />;
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles['admin-panel']}>
      <button type="button" onClick={handleClick}>
        Categories
      </button>
      <button type="button" onClick={handleClick}>
        Products
      </button>
      <button type="button" onClick={handleClick}>
        Promotions
      </button>
      <button type="button" onClick={handleClick}>
        Users
      </button>
      {panelSwitch()}
    </div>
  );
};
