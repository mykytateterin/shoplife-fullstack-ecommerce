import { useState } from 'react';

import deleteIcon from '../../assets/images/icons/delete-icon.svg';

import styles from './CategoriesPanel.module.scss';
import {
  getCategoriesStorage,
  setCategoriesStorage,
} from '~/lib/storage/catalog/categoryStorage';

export const CategoriesPanel = () => {
  const [categories, setCategories] = useState(getCategoriesStorage());
  const [isAddNewCategory, setIsAddNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', url: '' });

  const handleAddNewCategory = () => {
    setIsAddNewCategory(!isAddNewCategory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

  const handleChange = (e) => {
    if (e.target.id === 'name')
      setNewCategory({ ...newCategory, name: e.target.value });
    else if (e.target.id === 'url')
      setNewCategory({ ...newCategory, url: e.target.value });
  };

  const handleDelete = (index) => {
    const keepedCategories = {};
    const keepedCategoriesArray = Object.keys(categories || {})
      .map((key, i) => index !== i && { [key]: categories[key] })
      .filter((value) => !!value);

    Object.assign(keepedCategories, ...keepedCategoriesArray);
    setCategoriesStorage(keepedCategories);
    setCategories(getCategoriesStorage());
  };

  return (
    <div className={styles['categories-panel']}>
      <ul className={styles['categories-panel__categories']}>
        {Object.keys(categories || {}).map((key, index) => (
          <li key={key} className={styles['categories-panel__categories-item']}>
            {key} {categories[key].url}
            <img
              onClick={() => handleDelete(index)}
              src={deleteIcon}
              alt="Delete the category"
              className={styles['categories-panel__categories-icon']}
            />
          </li>
        ))}
      </ul>
      <p
        onClick={handleAddNewCategory}
        className={styles['categories-panel__add-new']}
      >
        Add a new category
      </p>
      {isAddNewCategory && (
        <form
          onSubmit={handleSubmit}
          className={styles['categories-panel__add-new-form']}
        >
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={newCategory.name}
            onChange={handleChange}
            className={styles['categories-panel__add-new-input']}
            required
          />
          <input
            type="text"
            id="url"
            placeholder="URL after /"
            value={newCategory.url}
            onChange={handleChange}
            className={styles['categories-panel__add-new-input']}
            required
          />
          <button
            type="submit"
            className={styles['categories-panel__add-new-submit']}
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
};
