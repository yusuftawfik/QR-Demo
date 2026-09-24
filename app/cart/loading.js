import { BackRowSkeleton, LineItemSkeleton, SkelBox } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <BackRowSkeleton />
      <LineItemSkeleton />
      <LineItemSkeleton />
      <LineItemSkeleton />
      <div className="section-title" style={{ marginTop: 22, opacity: 0.45 }}>Pay with</div>
      <div className="paymethods">
        <SkelBox height={68} />
        <SkelBox height={68} />
        <SkelBox height={68} />
      </div>
      <SkelBox width="100%" height={50} radius={20} style={{ marginTop: 16 }} />
    </>
  );
}
