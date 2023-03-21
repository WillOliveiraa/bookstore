import { NextPageContext } from 'next';

import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

export async function myGet(url: string, ctx: NextPageContext) {
  const cookie = ctx.req?.headers?.cookie;

  // const getUserId = cookie?.includes('bookStore-userId=');
  const getUserId = cookie?.substring(cookie?.indexOf('userId=') + 7, cookie?.length);
  // console.log(getUserId);

  const resp = await fetch(`${url}?id=${getUserId}`, {
    headers: {
      cookie: cookie!
    }
  });

  console.log(`testeeee: ${resp.status}`);
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  if (resp.status === 401 && !ctx.req) {
    // if ((resp.status === 404 || resp.status === 401) && !ctx.req) {
    Router.replace('/login');
    return {};
  }

  if (resp.status === 401 && ctx.req) {
    // if ((resp.status === 404 || resp.status === 401) && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000/login'
    });
    ctx.res?.end();
    return;
  }

  const json = await resp.json();
  console.log(`testeee2: ${json}`);
  return json;
}
