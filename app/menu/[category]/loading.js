import { BackRowSkeleton, GridSkeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <BackRowSkeleton />
      <GridSkeleton count={5} />
    </>
  );
}
