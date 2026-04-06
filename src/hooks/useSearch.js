import { useMemo } from 'react';
import { products } from '../data/products';

export function useSearch(query) {
  return useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    if (q.length < 1) return [];
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      (p.tag && p.tag.toLowerCase().includes(q))
    );
  }, [query]);
}
