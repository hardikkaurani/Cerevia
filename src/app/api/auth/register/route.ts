import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validation/auth';
import { signAccessToken } from '@/lib/jwt';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { ConflictError } from '@/lib/errors';
import bcryptjs from 'bcryptjs';

export const POST = withApiHandler(async (request: Request) => {
  const body = await request.json().catch(() => ({}));

  // 1. Validate request body with Zod
  const { email, password, fullName, avatar } = registerSchema.parse(body);

  // 2. Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  // 3. Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcryptjs.hash(password, saltRounds);

  if (existingUser) {
    // If user was created via Google OAuth (has Google avatar), allow them to
    // set a real password by updating their account — this links email+password
    // login to their existing Google-created account.
    if (existingUser.avatar && existingUser.avatar.includes('googleusercontent.com')) {
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          password: hashedPassword,
          fullName: existingUser.fullName || fullName,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = updatedUser;

      const token = signAccessToken({
        userId: updatedUser.id,
        email: updatedUser.email,
      });

      return successResponse(
        'Account linked successfully. You can now sign in with email and password.',
        { user: userWithoutPassword, token },
        200,
      );
    }

    throw new ConflictError('Email is already registered');
  }

  // 4. Create the new user
  const newUser = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      fullName,
      avatar: avatar || null,
    },
  });

  // 5. Exclude password hash from response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = newUser;

  return successResponse(
    'User registered successfully',
    userWithoutPassword,
    201,
  );
});
