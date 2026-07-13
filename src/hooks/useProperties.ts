import { useInfiniteQuery } from '@tanstack/react-query';
import { getCatalog, PropertyFilter } from '@/services/properties';

const PAGE_SIZE = 10;

type CatalogFilter = Omit<PropertyFilter, 'page' | 'pageSize'>;

export function useProperties(filter: CatalogFilter = {}) {
  return useInfiniteQuery({
    queryKey: ['properties', filter],
    queryFn: ({ pageParam }) => getCatalog({ ...filter, page: pageParam, pageSize: PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
}
