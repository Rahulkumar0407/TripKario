import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/adminconsole1811', '/adminconsole1811/*', '/api/admin/*'],
      },
    ],
    sitemap: 'https://tripkario.com/sitemap.xml',
  };
}
