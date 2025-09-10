import { MetadataRoute } from 'next'
import { siteConfig } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.social.website || 'https://shashanksingh.dev'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/.data/', '/.next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
