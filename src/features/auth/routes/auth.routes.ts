import { Router } from 'express';
import { asyncHandler } from '@root/globals/middlewares/asyncHandler';
import { loginSchema } from '@root/features/auth/schemes/loginSchemes';
import { registerSchema } from '@root/features/auth/schemes/registerSchemes';
import { schemesValidator } from '@root/globals/middlewares/schemesValidator';
import { resetPasswordScehma } from '@root/features/auth/schemes/resetPasswordSchemes';
import { forgotPasswordScehma } from '@root/features/auth/schemes/forgotPasswordSchemes';
import { activateAccountSchema } from '@root/features/auth/schemes/activateAccountSchemes';
import { checkAuthentication, protectRoute } from '@root/globals/middlewares/authMiddleware';
import signin from '@root/features/auth/controllers/signinController';
import signup from '@root/features/auth/controllers/signupController';
import signout from '@root/features/auth/controllers/signoutController';
import currentUser from '@root/features/auth/controllers/currentUserController';
import resetPassword from '@root/features/auth/controllers/resetPasswordController';
import accountActivation from '@root/features/auth/controllers/activationController';
import forgotPassword from '@root/features/auth/controllers/forgotPasswordController';

const router = Router();

router.post('/signin', schemesValidator(loginSchema), asyncHandler(signin));
router.post('/signup', schemesValidator(registerSchema), asyncHandler(signup));
router.get('/me', protectRoute, checkAuthentication, asyncHandler(currentUser));
router.get('/signout', protectRoute, checkAuthentication, asyncHandler(signout));
router.post('/reset-password', schemesValidator(resetPasswordScehma), asyncHandler(resetPassword));
router.post('/forgot-password', schemesValidator(forgotPasswordScehma), asyncHandler(forgotPassword));
router.post('/account-activation', schemesValidator(activateAccountSchema), asyncHandler(accountActivation));

export const authRoutes = router;
