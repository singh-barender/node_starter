import { Application } from 'express';
import { config } from '@root/config';
import { authRoutes } from '@root/features/auth/routes/auth.routes';

const routes = [{ path: '/auth', route: authRoutes }];

export default (app: Application) => {
  routes.forEach((route) => app.use(`${config.BASE_PATH}${route.path}`, route.route));
};
