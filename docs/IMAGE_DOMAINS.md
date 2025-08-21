# Image Domain Configuration

This document explains how to handle external image domains in this Next.js project.

## Problem

Next.js requires you to configure external image domains in `next.config.ts` for security reasons. If you try to use an image from an unconfigured domain, you'll get an error like:

```
Invalid src prop on `next/image`, hostname "example.com" is not configured under images in your `next.config.js`
```

## Solution

### 1. Automatic Domain Addition

We've created a utility script to automatically add new domains:

```bash
node scripts/add-image-domain.js example.com
```

### 2. Manual Configuration

Add the domain to `next.config.ts`:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      // ... other domains
    ],
  },
};
```

### 3. Using ImageWithFallback Component

We've created a `ImageWithFallback` component that handles image loading errors gracefully:

```tsx
import ImageWithFallback from '@/components/ImageWithFallback';

<ImageWithFallback
  src="https://example.com/image.jpg"
  alt="Description"
  width={800}
  height={400}
  fallbackSrc="/default-image.png"
/>
```

## Common Image Domains

The following domains are already configured:

- `cdn.sanity.io` - Sanity CMS
- `images.unsplash.com` - Unsplash
- `picsum.photos` - Lorem Picsum
- `static.vecteezy.com` - Vecteezy
- `images.app.goo.gl` - Google
- `www.facebook.com` - Facebook
- `images.ctfassets.net` - Contentful
- `res.cloudinary.com` - Cloudinary
- `lh3.googleusercontent.com` - Google Profile Images
- Various Facebook CDN domains

## Best Practices

1. **Always use HTTPS** for external images
2. **Provide fallback images** for better UX
3. **Use the ImageWithFallback component** for external images
4. **Validate image URLs** before using them
5. **Monitor console warnings** for failed image loads

## Troubleshooting

If you encounter image loading issues:

1. Check if the domain is configured in `next.config.ts`
2. Verify the image URL is accessible
3. Check browser console for error messages
4. Use the utility script to add missing domains
5. Restart the development server after config changes 