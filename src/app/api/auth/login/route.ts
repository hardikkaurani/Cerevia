import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validation/auth';
import { signAccessToken } from '@/lib/jwt';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { AuthenticationError } from '@/lib/errors';
import bcryptjs from 'bcryptjs';

export const POST = withApiHandler(async (request: Request) => {
  const body = await request.json().catch(() => ({}));

  // 1. Validate request body with Zod
  const { email, password } = loginSchema.parse(body);

  // 2. Find user by email
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }

  // 3. Verify password
  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    // Check if this user was created via Google OAuth (has avatar from Google)
    // and provide a helpful error message
    if (user.avatar && user.avatar.includes('googleusercontent.com')) {
      throw new AuthenticationError(
        'This account was created with Google Sign-In. Please use the "Sign in with Google" button below.'
      );
    }
    throw new AuthenticationError('Invalid email or password');
  }

  // 4. Generate access token
  const token = signAccessToken({
    userId: user.id,
    email: user.email,
  });

  // 5. Exclude password hash from response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;

  return successResponse('Login successful', {
    user: userWithoutPassword,
    token,
  });
});
