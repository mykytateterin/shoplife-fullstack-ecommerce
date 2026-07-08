import { useState } from 'react';

import type { Categories } from '../../types/domain';

import deleteIcon from '../../assets/images/icons/delete-icon.svg';
import {
  getCategoriesStorage,
  setCategoriesStorage,
} from '../../lib/storage/catalog/categoryStorage';
import styles from './CategoriesPanel.module.scss';

const CategoriesPanel = (): React.JSX.Element => {
  const [categories, setCategories] = useState(getCategoriesStorage());
  const [isAddNewCategory, setIsAddNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', url: '' });

  const handleAddNewCategory = (): void => {
    setIsAddNewCategory(!isAddNewCategory);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const updatedCategories = {
      [newCategory.name]: {
        url: '/' + newCategory.url,
      },
      ...categories,
    };

    setCategories(updatedCategories);
    setCategoriesStorage(updatedCategories);
    setNewCategory({ name: '', url: '' });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.currentTarget;

    if (id === 'name') {
      setNewCategory({ ...newCategory, name: value });
      return;
    }
    if (id === 'url') {
      setNewCategory({ ...newCategory, url: value });
    }
  };

  const handleDelete = (index: number): void => {
    const keepedCategories: Categories = {};
    const keepedCategoriesArray = Object.keys(categories)
      .map((key, i) => index !== i && { [key]: categories[key] })
      .filter((value) => !!value);

    Object.assign(keepedCategories, ...keepedCategoriesArray);
    setCategoriesStorage(keepedCategories);
    setCategories(getCategoriesStorage());
  };

  return (
    <div className={styles['categories-panel']}>
      <ul className={styles['categories-panel__categories']}>
        {Object.entries(categories).map(([name, category], index) => (
          <li className={styles['categories-panel__categories-item']} key={name}>
            {name} {category.url}
            <img
              alt="Delete the category"
              className={styles['categories-panel__categories-icon']}
              onClick={() => {
                handleDelete(index);
              }}
              src={deleteIcon}
            />
          </li>
        ))}
      </ul>
      <p className={styles['categories-panel__add-new']} onClick={handleAddNewCategory}>
        Add a new category
      </p>
      {isAddNewCategory && (
        <form className={styles['categories-panel__add-new-form']} onSubmit={handleSubmit}>
          <input
            className={styles['categories-panel__add-new-input']}
            id="name"
            onChange={handleChange}
            placeholder="Name"
            required
            type="text"
            value={newCategory.name}
          />
          <input
            className={styles['categories-panel__add-new-input']}
            id="url"
            onChange={handleChange}
            placeholder="URL after /"
            required
            type="text"
            value={newCategory.url}
          />
          <button className={styles['categories-panel__add-new-submit']} type="submit">
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export { CategoriesPanel };
