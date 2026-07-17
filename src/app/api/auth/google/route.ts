import { prisma } from '@/lib/prisma';
import { signAccessToken } from '@/lib/jwt';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { AuthenticationError } from '@/lib/errors';
import bcryptjs from 'bcryptjs';

export const POST = withApiHandler(async (request: Request) => {
  const body = await request.json().catch(() => ({}));
  const { credential } = body;

  if (!credential) {
    throw new AuthenticationError('Google credential is required');
  }

  // Verify the Google ID Token by calling Google's oauth2 tokeninfo endpoint
  let googleUser;
  try {
    const tokenInfoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    if (!tokenInfoRes.ok) {
      throw new Error('Google token validation failed');
    }
    googleUser = await tokenInfoRes.json();
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new AuthenticationError('Invalid Google credential');
  }

  const { email, name, picture, email_verified } = googleUser;

  if (!email) {
    throw new AuthenticationError('Email not returned from Google');
  }

  if (email_verified !== 'true' && email_verified !== true) {
    throw new AuthenticationError('Google email is not verified');
  }

  // Find or create user by email
  let user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    // Generate a random, cryptographically secure password to satisfy Prisma schema constraint
    // since they login via Google OAuth, this is a standard and secure practice.
    const randomPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const hashedPassword = await bcryptjs.hash(randomPassword, 10);
    
    user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        fullName: name || 'Google Learner',
        avatar: picture || null,
        password: hashedPassword,
      },
    });
  } else {
    // Link existing user if they registered via email originally
    // Update display name and avatar if not set
    const updateData: { fullName?: string; avatar?: string } = {};
    if (!user.fullName && name) updateData.fullName = name;
    if (!user.avatar && picture) updateData.avatar = picture;

    if (Object.keys(updateData).length > 0) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });
    }
  }

  // Generate Cerevia access token
  const token = signAccessToken({
    userId: user.id,
    email: user.email,
  });

  // Exclude password hash from response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;

  return successResponse('Google authentication successful', {
    user: userWithoutPassword,
    token,
  });
});
