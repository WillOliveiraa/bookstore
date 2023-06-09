const Api = {
  url: 'http://localhost:3000/api'
};

const CategoriesUrl = {
  front: {
    list: '/categories',
    create: '/categories/create'
  },
  back: {
    category: '/category'
  }
};

const Auth = {
  front: { login: '/login' }
};

export { CategoriesUrl, Api, Auth };
