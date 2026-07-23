import { MetadataRoute } from 'next';
import { getValidUrl } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getValidUrl(process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL);
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
