import { SkelBox } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <SkelBox width={36} height={36} radius="50%" style={{ marginBottom: 22 }} />
      <SkelBox width={190} height={32} style={{ marginBottom: 20 }} />
      <SkelBox width="100%" height={160} radius="var(--r-md)" style={{ marginBottom: 14 }} />
      <SkelBox width="100%" height={160} radius="var(--r-md)" style={{ marginBottom: 14 }} />
      <div className="paymethods">
        <SkelBox height={54} radius={24} />
        <SkelBox height={54} radius={24} />
        <SkelBox height={54} radius={24} />
      </div>
      <SkelBox width="100%" height={54} radius={20} />
    </>
  );
}
