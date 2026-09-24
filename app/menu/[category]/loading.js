import { BackRowSkeleton, SearchSkeleton, GridSkeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <BackRowSkeleton />
      <SearchSkeleton />
      <GridSkeleton count={5} />
    </>
  );
}
