import Admin from './pages/Admin';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CURTAIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  CATALOG_ROUTE,
  MAIN_ROUTE,
  KONSTRUKT_ROUTE,
} from './utils/consts';
import Basket from './pages/Basket';
import Catalog from './pages/Catalog';
import Auth from './pages/Auth';
import CurtainPage from './pages/CurtainPage';
import Main from './pages/Main';
import Konstrukt from './pages/Konstrukt';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: <Admin />,
  },
  {
    path: BASKET_ROUTE,
    Component: <Basket />,
  },
];

export const publicRoutes = [
  {
    path: KONSTRUKT_ROUTE,
    Component: <Konstrukt />,
  },
  {
    path: MAIN_ROUTE,
    Component: <Main />,
  },
  {
    path: CATALOG_ROUTE,
    Component: <Catalog />,
  },
  {
    path: LOGIN_ROUTE,
    Component: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Auth />,
  },
  {
    path: CURTAIN_ROUTE + '/:id',
    Component: <CurtainPage />,
  },
];
