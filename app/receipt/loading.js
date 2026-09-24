import { SkelBox } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <SkelBox width={64} height={64} circle style={{ margin: '6px auto 16px' }} />
      <SkelBox width={120} height={20} style={{ margin: '0 auto 20px' }} />
      <div className="receipt">
        <SkelBox height={14} style={{ marginBottom: 10 }} />
        <SkelBox height={14} style={{ marginBottom: 10 }} />
        <SkelBox height={14} width="60%" />
      </div>
    </>
  );
}
