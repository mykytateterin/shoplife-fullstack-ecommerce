import { useState } from 'react';

import styles from './AdminPanel.module.scss';

const AdminPanel = (): React.JSX.Element => {
  const [currentPanel, setCurrentPanel] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { innerText } = event.currentTarget;

    setCurrentPanel(innerText);
  };

  const panelSwitch = (): React.JSX.Element | null => {
    switch (currentPanel) {
      default:
        return null;
    }
  };

  return (
    <div className={styles['admin-panel']}>
      <button onClick={handleClick} type="button">
        Categories
      </button>
      <button onClick={handleClick} type="button">
        Products
      </button>
      <button onClick={handleClick} type="button">
        Users
      </button>
      {panelSwitch()}
    </div>
  );
};

export { AdminPanel };
