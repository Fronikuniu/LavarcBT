export interface Routes {
  home: '/';
  auth: '/auth';
  login: '/auth/login';
  register: '/auth/register';
  about: '/about';
  gallery: '/gallery';
  gallerySingle: '/gallery/:id';
  builder: '/builder/:name';
  shop: '/shop';
  shopItems: '/shop/items';
  contact: '/contact';
  chat: '/contact/chat';
  settings: '/settings';
  recommendation: '/recommendation';
  shopCart: '/shopCart';
}

export const routes: Routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  about: '/about',
  gallery: '/gallery',
  gallerySingle: '/gallery/:id',
  builder: '/builder/:name',
  shop: '/shop',
  shopItems: '/shop/items',
  contact: '/contact',
  chat: '/contact/chat',
  settings: '/settings',
  recommendation: '/recommendation',
  shopCart: '/shopCart',
};
