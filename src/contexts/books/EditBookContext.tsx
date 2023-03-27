import { createContext } from 'react';

import BookModel from '../../models/book_model';

interface EditBookContextProps {
  book: BookModel;
}

const editBookContext = createContext({} as EditBookContextProps);

export default editBookContext;
