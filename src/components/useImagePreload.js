import { useEffect } from 'react';

export function useImagePreload({ href, srcSet, sizes, fetchPriority = 'high' }) {
  useEffect(() => {
    if (!href) return undefined;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    if (srcSet) link.imageSrcset = srcSet;
    if (sizes) link.imageSizes = sizes;
    if (fetchPriority) link.setAttribute('fetchpriority', fetchPriority);

    document.head.appendChild(link);

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [fetchPriority, href, sizes, srcSet]);
}
