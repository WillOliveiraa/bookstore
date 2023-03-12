import axios from 'axios';

export const api = axios.create({
  baseURL: '/api'
  // headers: {
  //   'content-type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  // }
});
