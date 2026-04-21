const DEFAULT_IMAGE_PROXY = 'https://images.weserv.nl/';

const hasHttpScheme = (value) => /^https?:\/\//i.test(value || '');

const encodeOriginalUrl = (imageUrl) => {
    try {
        return new URL(imageUrl).href;
    } catch {
        return null;
    }
};

export const getOptimizedImageUrl = (
    imageUrl,
    { width, height, quality = 78, fit = 'cover', format = 'webp' } = {},
) => {
    if (!imageUrl || imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) {
        return imageUrl;
    }

    if (!hasHttpScheme(imageUrl)) {
        return imageUrl;
    }

    const encodedUrl = encodeOriginalUrl(imageUrl);

    if (!encodedUrl) {
        return imageUrl;
    }

    const params = new URLSearchParams();
    params.set('url', encodedUrl);
    if (width) params.set('w', String(width));
    if (height) params.set('h', String(height));
    if (fit) params.set('fit', fit);
    if (quality) params.set('q', String(quality));
    if (format) params.set('output', format);

    return `${DEFAULT_IMAGE_PROXY}?${params.toString()}`;
};
