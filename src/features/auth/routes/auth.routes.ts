import { Router } from 'express';
import { asyncHandler } from '@root/globals/middlewares/async-handler';
import { loginSchema } from '@root/features/auth/schemes/login.schema';
import { registerSchema } from '@root/features/auth/schemes/register.schema';
import { joiValidator } from '@root/globals/middlewares/validator.middleware';
import { resetPasswordScehma } from '@root/features/auth/schemes/reset-password.schema';
import { forgotPasswordScehma } from '@root/features/auth/schemes/forgot-password.schema';
import { activateAccountSchema } from '@root/features/auth/schemes/activateAccount.schema';
import { checkAuthentication, protectRoute } from '@root/globals/middlewares/auth-middleware';
import signin from '@root/features/auth/controllers/signin.controller';
import signup from '@root/features/auth/controllers/signup.controller';
import signout from '@root/features/auth/controllers/signout.controller';
import currentUser from '@root/features/auth/controllers/currentUser.controller';
import resetPassword from '@root/features/auth/controllers/resetPassword.controller';
import accountActivation from '@root/features/auth/controllers/activation.controller';
import forgotPassword from '@root/features/auth/controllers/forgotPassword.controller';

const router = Router();

router.post('/signin', joiValidator(loginSchema), asyncHandler(signin));
router.post('/signup', joiValidator(registerSchema), asyncHandler(signup));
router.get('/me', protectRoute, checkAuthentication, asyncHandler(currentUser));
router.get('/signout', protectRoute, checkAuthentication, asyncHandler(signout));
router.post('/reset-password', joiValidator(resetPasswordScehma), asyncHandler(resetPassword));
router.post('/forgot-password', joiValidator(forgotPasswordScehma), asyncHandler(forgotPassword));
router.post('/account-activation', joiValidator(activateAccountSchema), asyncHandler(accountActivation));

export const authRoutes = router;
