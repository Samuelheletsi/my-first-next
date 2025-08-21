// Utility functions for handling images

export const isExternalImage = (src: string): boolean => {
  return src.startsWith('http://') || src.startsWith('https://');
};

export const getImageDomain = (src: string): string | null => {
  if (!isExternalImage(src)) return null;
  
  try {
    const url = new URL(src);
    return url.hostname;
  } catch {
    return null;
  }
};

export const validateImageUrl = (src: string): boolean => {
  if (!isExternalImage(src)) return true; // Local images are always valid
  
  try {
    const url = new URL(src);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

// Common image hosting domains that are typically safe
export const COMMON_IMAGE_DOMAINS = [
  'cdn.sanity.io',
  'images.unsplash.com',
  'picsum.photos',
  'static.vecteezy.com',
  'images.app.goo.gl',
  'www.facebook.com',
  'images.ctfassets.net',
  'res.cloudinary.com',
  'lh3.googleusercontent.com',
  'graph.facebook.com',
  'platform-lookaside.fbsbx.com',
  'scontent.xx.fbcdn.net',
  'scontent.facc1-1.fna.fbcdn.net',
  'scontent.facc2-1.fna.fbcdn.net',
  'scontent.facc3-1.fna.fbcdn.net',
  'scontent.facc4-1.fna.fbcdn.net',
  'scontent.facc5-1.fna.fbcdn.net',
  'scontent.facc6-1.fna.fbcdn.net',
  'scontent.facc7-1.fna.fbcdn.net',
  'scontent.facc8-1.fna.fbcdn.net',
  'scontent.facc9-1.fna.fbcdn.net',
  'scontent.facc10-1.fna.fbcdn.net',
];

export const isCommonImageDomain = (domain: string): boolean => {
  return COMMON_IMAGE_DOMAINS.includes(domain);
}; 