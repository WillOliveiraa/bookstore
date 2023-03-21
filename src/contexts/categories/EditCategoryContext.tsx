import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import CategoryModel from '../../models/category_model';

interface EditCategoryContextProps {
  children: ReactNode;
}

type EditCategoryContextData = {
  selectedCategory: CategoryModel | undefined;
  setSelectedCategory: Dispatch<SetStateAction<CategoryModel | undefined>>;
};

const EditCategoryContext = createContext({} as EditCategoryContextData);

export function EditCategoryProvider({ children }: EditCategoryContextProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();

  return (
    <EditCategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </EditCategoryContext.Provider>
  );
}

export const useEditCategory = () => useContext(EditCategoryContext);
