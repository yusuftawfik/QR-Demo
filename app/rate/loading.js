import { SkelBox } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <SkelBox width="90%" height={32} style={{ marginBottom: 10 }} />
      <SkelBox width="70%" height={32} style={{ marginBottom: 10 }} />
      <SkelBox width="45%" height={32} style={{ marginBottom: 24 }} />
      <SkelBox width={70} height={20} style={{ marginBottom: 16 }} />
      <SkelBox width={260} height={40} style={{ margin: '0 auto 26px' }} />
      <SkelBox width="100%" height={178} radius="var(--r-lg)" style={{ marginBottom: 20 }} />
      <SkelBox width="100%" height={54} radius={20} />
    </>
  );
}
