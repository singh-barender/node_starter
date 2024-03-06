import { Router } from 'express';
import { asyncHandler } from '@root/globals/helpers/async-handler';
import { loginSchema } from '@root/features/auth/schemes/login.schema';
import { registerSchema } from '@root/features/auth/schemes/register.schema';
import { joiValidator } from '@root/globals/middlewares/validator.middleware';
import { activateAccountSchema } from '@root/features/auth/schemes/activateAccount.schema';
import { checkAuthentication, protectRoute } from '@root/globals/middlewares/auth-middleware';
import signin from '@root/features/auth/controllers/signin.controller';
import signup from '@root/features/auth/controllers/signup.controller';
import signout from '@root/features/auth/controllers/signout.controller';
import activateAccount from '@root/features/auth/controllers/activateAccount.controller';

const router = Router();

router.post('/signup', joiValidator(registerSchema), asyncHandler(signup));
router.post('/signin', joiValidator(loginSchema), asyncHandler(signin));
router.post('/signout', protectRoute, checkAuthentication, asyncHandler(signout));
router.post('/account-activation', joiValidator(activateAccountSchema), asyncHandler(activateAccount));

export const authRoutes = router;
