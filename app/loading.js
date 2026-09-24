import { TopBarSkeleton, PillsSkeleton, GridSkeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <TopBarSkeleton />
      <div className="skel" style={{ height: 44, borderRadius: 'var(--r-pill)', marginBottom: 22 }} />
      <div className="section-title" style={{ opacity: 0.45 }}>Our Cuisines</div>
      <PillsSkeleton />
      <div className="section-title" style={{ opacity: 0.45 }}>Highly Rated</div>
      <GridSkeleton count={6} />
    </>
  );
}
