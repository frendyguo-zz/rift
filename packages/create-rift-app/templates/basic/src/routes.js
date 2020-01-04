import Home from './pages/Home';
import { asyncComponent } from '@frendyguo/rift';

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/About'),
      Placeholder: null,
    }),
  },
];
